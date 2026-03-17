import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { login } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    let emailToVerify = null;

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (admin && admin.email) {
      emailToVerify = admin.email;
    } else {
        if (email === process.env.ADMIN_EMAIL) {
            emailToVerify = process.env.ADMIN_EMAIL;
        }
    }

    if (!emailToVerify) {
        return NextResponse.json({ error: "Admin email not configured" }, { status: 404 });
    }

    const record = await prisma.otp.findUnique({
      where: { email: emailToVerify },
    });

    if (!record || record.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }

    if (new Date() > record.expiresAt) {
      return NextResponse.json({ error: "OTP expired" }, { status: 401 });
    }

    // Delete OTP after successful use
    await prisma.otp.delete({ where: { email: emailToVerify } });

    // Set JWT Session Cookie
    await login({ role: "admin", username: admin?.username || 'admin' });

    return NextResponse.json({ message: "Admin Login successful" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
