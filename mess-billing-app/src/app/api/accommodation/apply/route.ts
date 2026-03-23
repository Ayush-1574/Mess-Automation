import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { decrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import fs from "fs";
import { transporter } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    
    if (!sessionCookie) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const session = await decrypt(sessionCookie);
    if (!session || session.role !== 'accommodation_applicant') return NextResponse.json({ error: "Unauthorized role" }, { status: 403 });

    const formData = await req.formData();
    
    // Extract file
    const file = formData.get("file") as File | null;
    let documentUrl = null;

    if (file && file.size > 0) {
       const bytes = await file.arrayBuffer();
       const buffer = Buffer.from(bytes);

       const uploadDir = join(process.cwd(), "public", "uploads");
       if (!fs.existsSync(uploadDir)) {
          await mkdir(uploadDir, { recursive: true });
       }
       
       const uniqueName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
       const filePath = join(uploadDir, uniqueName);
       await writeFile(filePath, buffer);
       documentUrl = `/uploads/${uniqueName}`;
    }

    const newRequest = await prisma.accommodationRequest.create({
      data: {
        applicantId: session.id,
        applicantType: (formData.get("applicantType") as string) || 'intern',
        applicantName: formData.get("applicantName") as string,
        gender: formData.get("gender") as string,
        department: formData.get("department") as string,
        contactNo: formData.get("contactNo") as string,
        address: formData.get("address") as string,
        mentorName: formData.get("mentorName") as string,
        mentorEmail: formData.get("mentorEmail") as string,
        arrivalDate: new Date(formData.get("arrivalDate") as string),
        arrivalTime: formData.get("arrivalTime") as string,
        departureDate: new Date(formData.get("departureDate") as string),
        departureTime: formData.get("departureTime") as string,
        financialSupportAmount: formData.get("financialSupportAmount") ? parseFloat(formData.get("financialSupportAmount") as string) : null,
        category: (formData.get("category") as string) || 'A',
        documentUrl: documentUrl
      },
      include: {
        applicant: true
      }
    });

    // Send Confirmation Email safely
    if (newRequest.applicant?.email) {
       try {
         await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: newRequest.applicant.email,
            subject: `Accommodation Application Form Received - ${newRequest.applicantName}`,
            html: `
              <div style="font-family: sans-serif; padding: 20px; background-color: #f8fafc; color: #334155;">
                <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <h2 style="color: #0f172a; margin-top: 0;">Application Received</h2>
                  <p>Dear ${newRequest.applicantName},</p>
                  <p>Your Accommodation Application Form has been successfully submitted to the server and is now pending review.</p>
                  <p><strong>Tracking ID:</strong> #${newRequest.id}<br>
                  <strong>Dates:</strong> ${newRequest.arrivalDate.toLocaleDateString()} to ${newRequest.departureDate.toLocaleDateString()}</p>
                  <p>You can check your application's real-time progression inside your Applicant Dashboard.</p><br/>
                  <p style="font-size: 12px; color: #94a3b8;">This is an automated system notification.</p>
                </div>
              </div>
            `
         });
       } catch (err) { console.error("Could not send applicant copy email", err); }
    }

    return NextResponse.json({ success: true, requestId: newRequest.id });
  } catch (err: any) {
    console.error("Accommodation Application Error:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
