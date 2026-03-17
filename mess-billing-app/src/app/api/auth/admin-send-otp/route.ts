import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { transporter } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin || !admin.email) {
      // For security, don't reveal if admin doesn't exist but fallback to env user if it matches
      const defaultAdmin = process.env.ADMIN_USERNAME || "admin";
      const adminEmail = process.env.ADMIN_EMAIL;
      
      if (email !== adminEmail) {
        return NextResponse.json({ error: "Admin or email not found" }, { status: 404 });
      }

      // If env default admin matches but has no DB record to pull email from, we can use env var email if provided
      if (!adminEmail) {
         return NextResponse.json({ error: "Admin email not configured in environment" }, { status: 404 });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await prisma.otp.upsert({
        where: { email: adminEmail },
        update: {
          otp,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
          createdAt: new Date(),
        },
        create: {
          email: adminEmail,
          otp,
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.SMTP_USER || process.env.EMAIL_USER,
        to: adminEmail,
        subject: "Login OTP for Mess Portal Admin",
        text: `Your OTP for Admin login is: ${otp}\nIt is valid for 10 minutes.\nDo not share it with anyone.`,
      });

      return NextResponse.json({ message: "OTP sent successfully", emailPartial: adminEmail.replace(/(.{2})(.*)(?=@)/, "$1***") });
    }

    // DB Admin case
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.otp.upsert({
      where: { email: admin.email },
      update: {
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        createdAt: new Date(),
      },
      create: {
        email: admin.email,
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER || process.env.EMAIL_USER,
      to: admin.email,
      subject: "Login OTP for Mess Portal Admin",
      text: `Your OTP for Admin login is: ${otp}\nIt is valid for 10 minutes.\nDo not share it with anyone.`,
    });

    return NextResponse.json({ message: "OTP sent successfully", emailPartial: admin.email.replace(/(.{2})(.*)(?=@)/, "$1***") });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
