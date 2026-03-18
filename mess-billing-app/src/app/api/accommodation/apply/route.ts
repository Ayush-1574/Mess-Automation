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
    if (!session || session.role !== 'accommodation_applicant') return NextResponse.json({ error: "Unauthorized role" }, { status: 403 });

    const data = await req.json();

    const newRequest = await prisma.accommodationRequest.create({
      data: {
        applicantId: session.id,
        applicantType: data.applicantType || 'intern',
        applicantName: data.applicantName,
        gender: data.gender,
        department: data.department,
        contactNo: data.contactNo,
        address: data.address,
        mentorName: data.mentorName,
        mentorEmail: data.mentorEmail,
        arrivalDate: new Date(data.arrivalDate),
        arrivalTime: data.arrivalTime,
        departureDate: new Date(data.departureDate),
        departureTime: data.departureTime,
        financialSupportAmount: data.financialSupportAmount ? parseFloat(data.financialSupportAmount) : null,
        category: data.category || 'A',
      }
    });

    return NextResponse.json({ success: true, requestId: newRequest.id });
  } catch (err: any) {
    console.error("Accommodation Application Error:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
