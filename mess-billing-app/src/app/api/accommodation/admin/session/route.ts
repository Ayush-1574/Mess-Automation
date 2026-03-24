import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    let sessionSetting = await prisma.systemSetting.findUnique({
      where: { key: 'CURRENT_ACCOMMODATION_SESSION' },
    });

    if (!sessionSetting) {
      const d = new Date();
      const defaultSession = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
      sessionSetting = await prisma.systemSetting.create({
        data: { key: 'CURRENT_ACCOMMODATION_SESSION', value: defaultSession },
      });
    }

    return NextResponse.json({ session: sessionSetting.value });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { session } = await req.json();

    if (!session) {
      return NextResponse.json({ error: "Session value required" }, { status: 400 });
    }

    let sessionSetting = await prisma.systemSetting.findUnique({
      where: { key: 'CURRENT_ACCOMMODATION_SESSION' },
    });

    if (sessionSetting) {
      sessionSetting = await prisma.systemSetting.update({
        where: { key: 'CURRENT_ACCOMMODATION_SESSION' },
        data: { value: session },
      });
    } else {
      sessionSetting = await prisma.systemSetting.create({
        data: { key: 'CURRENT_ACCOMMODATION_SESSION', value: session },
      });
    }

    return NextResponse.json({ success: true, session: sessionSetting.value });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
