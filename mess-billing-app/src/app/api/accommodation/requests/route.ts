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

    if (session.role === 'accommodation_applicant') {
      const requests = await prisma.accommodationRequest.findMany({
        where: { applicantId: session.id },
        orderBy: { createdAt: 'desc' }
      });
      return NextResponse.json({ requests });
    } else if (session.role === 'accommodation_reviewer') {
      // Reviewers see requests based on their role
      let filter = {};
      if (session.reviewerRole === 'FACULTY') {
         // Should filter by mentorEmail = session.email possibly
         filter = { mentorEmail: session.email };
      } else if (session.reviewerRole === 'HOD') {
         // Should filter by department, etc. For simplicity, we just return those pending HOD
         filter = { mentorStatus: 'APPROVED' };
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
      return NextResponse.json({ requests });
    }

    return NextResponse.json({ error: "Unauthorized role" }, { status: 403 });
  } catch (err: any) {
    console.error("Fetch Requests Error:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
