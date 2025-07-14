import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  // Validate the ID
  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const admin = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (admin?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const users = await prisma.user.findMany();
    const payments = await prisma.payment.findMany();
    const documents = await prisma.document.findMany();
    return NextResponse.json({ users, payments, documents }, { status: 200 });
  } catch (error) {
    console.error("Something wrong", error);
  }
}
