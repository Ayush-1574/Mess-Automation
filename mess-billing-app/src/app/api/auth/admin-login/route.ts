import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { login } from "@/lib/auth";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // In a real application, fetch from DB. Here we check DB first, then falback to env vars for default setup.
    let adminRoleAssigned = false;

    // First try Database
    const adminRecord = await prisma.admin.findUnique({
      where: { username }
    });

    if (adminRecord) {
      const isMatch = await bcrypt.compare(password, adminRecord.password);
      if (isMatch) {
        adminRoleAssigned = true;
      }
    }

    // Fallback to env variables if DB login failed or no DB user exists
    if (!adminRoleAssigned) {
      const defaultAdmin = process.env.ADMIN_USERNAME || "admin";
      const defaultPass = process.env.ADMIN_PASSWORD || "admin123";

      if (username === defaultAdmin && password === defaultPass) {
        adminRoleAssigned = true;
      }
    }

    if (adminRoleAssigned) {
      await login({ role: "admin", username });
      return NextResponse.json({ message: "Admin login successful" });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
