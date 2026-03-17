import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { transporter } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const student = await prisma.student.findUnique({
      where: { email },
    });

    if (!student || !student.email) {
      return NextResponse.json({ error: "Student or email not found" }, { status: 404 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in database
    await prisma.otp.upsert({
      where: { email: student.email },
      update: {
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
        createdAt: new Date(),
      },
      create: {
        email: student.email,
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER || process.env.EMAIL_USER,
      to: student.email,
      subject: "Login OTP for Mess Portal",
      text: `Your OTP for Mess Portal login is: ${otp}\nIt is valid for 10 minutes.\nDo not share it with anyone.`,
    });

    return NextResponse.json({ message: "OTP sent successfully", emailPartial: student.email.replace(/(.{2})(.*)(?=@)/, "$1***") });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
