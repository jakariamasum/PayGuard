import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { amount, user_id, title } = body;

  // check whether user exits or not
  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "User does not exist" },
      { status: 404 }
    );
  }

  // proceed to create payment
  const payment = await prisma.payment.create({
    data: {
      title,
      user_id,
      amount: Number(amount),
    },
  });
  return NextResponse.json(payment, { status: 201 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("user_id");

  try {
    if (id) {
      // Fetch payments for a specific user
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        return NextResponse.json(
          { message: "User does not exist" },
          { status: 404 }
        );
      }

      const userPayments = await prisma.payment.findMany({
        where: {
          user_id: user.id,
        },
      });

      return NextResponse.json(userPayments, { status: 200 });
    }

    // If no `user_id` is provided, fetch all payments for admin
    const allPayments = await prisma.payment.findMany({
      include: {
        user: true,
      },
    });

    return NextResponse.json(allPayments, { status: 200 });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
