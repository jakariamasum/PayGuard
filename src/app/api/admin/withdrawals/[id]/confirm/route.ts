import { NextResponse } from "next/server"
import prisma from "@/lib/prisma";
import { stripe } from "@/utils/stripe";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    const withdrawal = await prisma.withdrawal.findUnique({
      where: { id },
      include: { user: true },
    })

    if (!withdrawal) {
      return NextResponse.json({ error: "Withdrawal not found" }, { status: 404 })
    }

    if (withdrawal.status !== "pending") {
      return NextResponse.json({ error: "Withdrawal has already been processed" }, { status: 400 })
    }

    // Create a transfer to the user's Stripe account
    const transfer = await stripe.transfers.create({
      amount: withdrawal.amount,
      currency: "usd",
      destination: withdrawal.stripeAccountId,
    })

    // Update the withdrawal status and add Stripe transfer ID
    const updatedWithdrawal = await prisma.withdrawal.update({
      where: { id },
      data: {
        status: "approved",
        stripeTransferId: transfer.id,
      },
    })

    // Update user's balance
    await prisma.user.update({
      where: { id: withdrawal.userId },
      data: {
        balance: {
          decrement: withdrawal.amount,
        },
      },
    })

    return NextResponse.json(updatedWithdrawal)
  } catch (error) {
    console.error("Error confirming withdrawal:", error)
    return NextResponse.json({ error: "Failed to confirm withdrawal" }, { status: 500 })
  }
}

