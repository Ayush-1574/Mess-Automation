import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { entryNo, resetKey, newPassword } = await req.json();

    if (!entryNo || !resetKey || !newPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const student = await prisma.student.findUnique({
      where: { entryNo },
    });

    if (!student || !student.resetToken || !student.resetTokenExp) {
      return NextResponse.json(
        { error: "Invalid or expired reset request. Please request a new key." },
        { status: 400 }
      );
    }

    // Check expiry
    if (new Date() > student.resetTokenExp) {
      return NextResponse.json(
        { error: "Reset key has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Verify reset key
    const isValid = await bcrypt.compare(resetKey, student.resetToken);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid reset key" },
        { status: 400 }
      );
    }

    // Hash and save new password, clear reset token
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.student.update({
      where: { entryNo },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExp: null,
      },
    });

    return NextResponse.json({
      message: "Password has been reset successfully. You can now sign in.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Failed to reset password. Please try again." },
      { status: 500 }
    );
  }
}
