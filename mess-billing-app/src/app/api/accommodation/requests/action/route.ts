import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { decrypt } from "@/lib/auth";
import { cookies } from "next/headers";

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

    const { requestId, requestIds, action } = await req.json(); // action: 'APPROVE' or 'REJECT'
    
    // Process either single or multiple requests robustly
    const idsToProcess = requestIds || (requestId ? [requestId] : []);

    if (idsToProcess.length === 0) {
       return NextResponse.json({ error: "No requests selected" }, { status: 400 });
    }

    // Determine which status to update based on Role
    let updateData: any = {};
    if (session.reviewerRole === 'FACULTY') {
       updateData.mentorStatus = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
       if (action === 'REJECTED') updateData.overallStatus = 'REJECTED';
    } else if (session.reviewerRole === 'HOD') {
       updateData.hodStatus = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
       if (action === 'REJECTED') updateData.overallStatus = 'REJECTED';
    } else if (session.reviewerRole === 'REGISTRAR') {
       updateData.registrarStatus = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
       if (action === 'REJECTED') updateData.overallStatus = 'REJECTED';
    } else if (session.reviewerRole === 'WARDEN') {
       updateData.wardenStatus = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
       if (action === 'APPROVE') updateData.overallStatus = 'APPROVED';
       else updateData.overallStatus = 'REJECTED';
    }

    // Process all updates natively utilizing a Prisma transaction or parallel operations
    await prisma.accommodationRequest.updateMany({
       where: { id: { in: idsToProcess } },
       data: updateData
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Accommodation Action Error:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
