import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { login } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    const student = await prisma.student.findUnique({
      where: { email },
    });

    if (!student || !student.email) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const record = await prisma.otp.findUnique({
      where: { email: student.email },
    });

    if (!record || record.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }

    if (new Date() > record.expiresAt) {
      return NextResponse.json({ error: "OTP expired" }, { status: 401 });
    }

    // Delete OTP after successful use
    await prisma.otp.delete({ where: { email: student.email } });

    // Set JWT Session Cookie
    await login({ role: "student", id: student.id, rollNo: student.rollNo });

    return NextResponse.json({ message: "Login successful", studentId: student.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
