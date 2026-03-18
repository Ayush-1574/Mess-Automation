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

    let applicant = await prisma.accommodationApplicant.findUnique({
      where: { email },
    });

    if (!applicant) {
       // Auto-register feature for easy testing
       applicant = await prisma.accommodationApplicant.create({
          data: {
             email,
             name: email.split('@')[0],
             password
          }
       });
    } else {
       if (applicant.password !== password) {
          return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
       }
    }

    const sessionData = {
      id: applicant.id,
      email: applicant.email,
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

    return NextResponse.json({ success: true, applicantId: applicant.id });
  } catch (err: any) {
    console.error("Applicant Login Error:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
