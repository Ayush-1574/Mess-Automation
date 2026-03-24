import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const requests = await prisma.accommodationRequest.findMany({
    where: { registrarStatus: 'APPROVED' },
    orderBy: { createdAt: 'desc' },
    include: {
       applicant: { select: { name: true, email: true } }
    }
  });
  return NextResponse.json({ count: requests.length, requests });
}
