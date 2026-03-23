import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { decrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { transporter } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    
    if (!sessionCookie) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const session = await decrypt(sessionCookie);
    if (!session || session.role !== 'accommodation_reviewer') {
       return NextResponse.json({ error: "Unauthorized role" }, { status: 403 });
    }

    const { requestId, requestIds, action, remarks } = await req.json(); // action: 'APPROVE' or 'REJECT'
    
    // Process either single or multiple requests robustly
    const idsToProcess = requestIds || (requestId ? [requestId] : []);

    if (idsToProcess.length === 0) {
       return NextResponse.json({ error: "No requests selected" }, { status: 400 });
    }

    // Determine which status to update based on Role
    let updateData: any = {};
    if (session.reviewerRole === 'FACULTY') {
       updateData.mentorStatus = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
       if (remarks !== undefined) updateData.mentorRemarks = remarks || null;
       if (action === 'REJECTED') updateData.overallStatus = 'REJECTED';
    } else if (session.reviewerRole === 'HOD') {
       updateData.hodStatus = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
       if (remarks !== undefined) updateData.hodRemarks = remarks || null;
       if (action === 'REJECTED') updateData.overallStatus = 'REJECTED';
    } else if (session.reviewerRole === 'REGISTRAR') {
       updateData.registrarStatus = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
       if (remarks !== undefined) updateData.registrarRemarks = remarks || null;
       if (action === 'REJECTED') updateData.overallStatus = 'REJECTED';
    } else if (session.reviewerRole === 'WARDEN') {
       updateData.wardenStatus = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
       if (remarks !== undefined) updateData.wardenRemarks = remarks || null;
       if (action === 'APPROVE') updateData.overallStatus = 'APPROVED';
       else updateData.overallStatus = 'REJECTED';
    }

    // Process all updates natively utilizing a Prisma transaction or parallel operations
    await prisma.accommodationRequest.updateMany({
       where: { id: { in: idsToProcess } },
       data: updateData
    });

    const affectedRequests = await prisma.accommodationRequest.findMany({
       where: { id: { in: idsToProcess } },
       include: { applicant: true }
    });

    // Send notifications to the applicants
    for (const req of affectedRequests) {
       if (req.applicant?.email) {
          try {
             await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: req.applicant.email,
                subject: `Accommodation Status Update - ${action === 'APPROVE' ? 'APPROVED' : 'REJECTED'}`,
                html: `
                  <div style="font-family: sans-serif; padding: 20px; background-color: #f8fafc; color: #334155;">
                    <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 12px; border-top: 5px solid ${action === 'APPROVE' ? '#10b981' : '#ef4444'}; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                      <h2 style="color: #0f172a; margin-top: 0;">Status Update on Your Application</h2>
                      <p>Dear ${req.applicantName},</p>
                      <p>Your Accommodation Application Form (Tracking #${req.id}) has received a new status update from the <strong>${session.reviewerRole}</strong>.</p>
                      <p><strong>Status Decision:</strong> <span style="font-weight: bold; color: ${action === 'APPROVE' ? '#059669' : '#dc2626'};">${action === 'APPROVE' ? 'APPROVED' : 'REJECTED'}</span></p>
                      ${remarks ? `<p><strong>Remarks left:</strong> "${remarks}"</p>` : ''}
                      <p>Please check your applicant dashboard to view the overall progression of your form.</p><br/>
                      <p style="font-size: 12px; color: #94a3b8;">This is an automated system notification.</p>
                    </div>
                  </div>
                `
             });
          } catch (e) { console.error("Could not send action email", e); }
       }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Accommodation Action Error:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
