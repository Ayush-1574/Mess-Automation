import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password, role } = await req.json();

    if (!email || !password || !role) {
      return NextResponse.json({ error: "Email, password, and role are required" }, { status: 400 });
    }

    let reviewer = await prisma.accommodationReviewer.findUnique({
      where: { email },
    });

    if (!reviewer) {
       reviewer = await prisma.accommodationReviewer.create({
          data: {
             email,
             name: email.split('@')[0],
             password,
             role: role as any
          }
       });
    } else {
       if (reviewer.password !== password) {
          return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
       }
       if (reviewer.role !== role) {
          reviewer = await prisma.accommodationReviewer.update({
             where: { email },
             data: { role: role as any }
          });
       }
    }

    const sessionData = {
      id: reviewer.id,
      email: reviewer.email,
      role: 'accommodation_reviewer',
      reviewerRole: reviewer.role
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

    return NextResponse.json({ success: true, reviewerId: reviewer.id, role: reviewer.role });
  } catch (err: any) {
    console.error("Reviewer Login Error:", err);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
