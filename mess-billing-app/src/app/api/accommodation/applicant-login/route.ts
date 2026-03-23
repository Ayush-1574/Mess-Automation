import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Use the Student model (AccommodationRequest.applicant references Student)
    let student = await prisma.student.findUnique({
      where: { email },
    });

    if (!student) {
       // Auto-register: create a Student record for the applicant
       // Generate a temporary roll number from email
       const rollNo = `ACC-${email.split('@')[0].toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
       student = await prisma.student.create({
          data: {
             email,
             name: email.split('@')[0],
             password,
             rollNo,
          }
       });
    } else {
       if (student.password && student.password !== password) {
          return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
       }
       // If the student has no password set, allow login and set it
       if (!student.password) {
          await prisma.student.update({
             where: { id: student.id },
             data: { password },
          });
       }
    }

    const sessionData = {
      id: student.id,
      email: student.email,
      role: 'accommodation_applicant',
    };

    const sessionInfo = await encrypt(sessionData);

    const cookieStore = await cookies();
    cookieStore.set('session', sessionInfo, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.json({ success: true, applicantId: student.id });
  } catch (err: any) {
    console.error("Applicant Login Error:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
