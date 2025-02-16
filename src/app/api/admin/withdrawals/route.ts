import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("user_id");
  try {
    if (id) {
      const userWithdraws = await prisma.payment.findMany({
        where: { user_id: id! },
        orderBy: { created_at: "desc" },
      });

      return NextResponse.json(userWithdraws);
    }
    // If no `user_id` is provided, fetch all withdraws for admin
    const allWithdraws = await prisma.payment.findMany({
      include: {
        user: true,
      },
    });

    return NextResponse.json(allWithdraws, { status: 200 });
  } catch (error) {
    console.error("Error fetching withdraws:", error);
    return NextResponse.json(
      { error: "Failed to fetch withdraws" },
      { status: 500 }
    );
  }
}
