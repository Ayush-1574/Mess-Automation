import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { decrypt } from "@/lib/auth";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const session = await decrypt(sessionCookie);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch Current Session
    const d = new Date();
    const defaultSession = `${d.getFullYear()}-${d.getMonth() + 1}`;
    let sessionSetting = await prisma.systemSetting.findUnique({ where: { key: 'CURRENT_ACCOMMODATION_SESSION' } });
    if (!sessionSetting) {
      sessionSetting = await prisma.systemSetting.create({ data: { key: 'CURRENT_ACCOMMODATION_SESSION', value: defaultSession } });
    }
    const currentSession = sessionSetting.value;

    const uniqueSessionsRaw = await prisma.accommodationRequest.findMany({ select: { session: true }, distinct: ['session'] });
    let allSessions = uniqueSessionsRaw.map(s => s.session).filter(Boolean);
    if (!allSessions.includes(currentSession)) allSessions.push(currentSession);

    if (session.role === 'accommodation_applicant') {
      const requests = await prisma.accommodationRequest.findMany({
        where: { applicantId: session.id },
        orderBy: { createdAt: 'desc' }
      });
      return NextResponse.json({ requests, currentSession, allSessions });
    } else if (session.role === 'accommodation_reviewer') {
      // Reviewers see requests based on their role
      let filter = {};
      if (session.reviewerRole === 'FACULTY') {
         // Should filter by mentorEmail = session.email possibly
         filter = { mentorEmail: session.email };
      } else if (session.reviewerRole === 'HOD') {
         filter = session.department ? { mentorStatus: 'APPROVED', department: session.department } : { mentorStatus: 'APPROVED' };
      } else if (session.reviewerRole === 'REGISTRAR') {
         filter = { hodStatus: 'APPROVED' };
      } else if (session.reviewerRole === 'WARDEN') {
         // WARDEN can see registrar approved
         filter = { registrarStatus: 'APPROVED' };
      }

      const requests = await prisma.accommodationRequest.findMany({
        where: filter,
        orderBy: { createdAt: 'desc' },
        include: {
           applicant: { select: { name: true, email: true } }
        }
      });
      return NextResponse.json({ requests, currentSession, allSessions });
    }

    return NextResponse.json({ error: "Unauthorized role" }, { status: 403 });
  } catch (err: any) {
    console.error("Fetch Requests Error:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
