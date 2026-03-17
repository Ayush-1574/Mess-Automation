import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { login } from "@/lib/auth";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { rollNo, password } = await req.json();

    if (!rollNo || !password) {
      return NextResponse.json({ error: "Roll number and password are required" }, { status: 400 });
    }

    const student = await prisma.student.findUnique({
      where: { rollNo },
    });

    if (!student || !student.password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Set JWT Session Cookie
    await login({ role: "student", id: student.id, rollNo: student.rollNo });

    return NextResponse.json({ message: "Login successful", studentId: student.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
