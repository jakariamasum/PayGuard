import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const withdrawal = await prisma.withdrawal.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!withdrawal) {
      return NextResponse.json(
        { error: "Withdrawal not found" },
        { status: 404 }
      );
    }

    if (withdrawal.status !== "pending") {
      return NextResponse.json(
        { error: "Withdrawal has already been processed" },
        { status: 400 }
      );
    }

    // Update the withdrawal status and add Stripe transfer ID
    const updatedWithdrawal = await prisma.withdrawal.update({
      where: { id },
      data: {
        status: "rejected",
      },
    });

    return NextResponse.json(updatedWithdrawal);
  } catch (error) {
    console.error("Error confirming withdrawal:", error);
    return NextResponse.json(
      { error: "Failed to confirm withdrawal" },
      { status: 500 }
    );
  }
}
