import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stripe } from "@/utils/stripe";

export async function POST(req: Request) {
  const { title, amount, user_id } = await req.json();
  console.log(title, amount, user_id);

  if (!title || !amount) {
    return NextResponse.json(
      { error: "Title and amount are required" },
      { status: 400 }
    );
  }

  try {
    const payment = await prisma.payment.create({
      data: {
        title,
        amount: Number(amount),
        user_id: user_id,
      },
    });

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/user/payments/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/user/payments/cancel`,
      metadata: {
        paymentId: payment.id,
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("user_id");
  try {
    if (id) {
      const userPayments = await prisma.payment.findMany({
        where: { user_id: id! },
        orderBy: { created_at: "desc" },
      });

      return NextResponse.json(userPayments);
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
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const { id, status } = await request.json();

  const existingPayment = await prisma.payment.findUnique({
    where: {
      id: id!,
    },
  });
  if (!existingPayment) {
    return NextResponse.json({ message: "Payment not found" }, { status: 404 });
  }

  const updatePayment = await prisma.payment.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });
  return NextResponse.json(updatePayment, { status: 201 });
}
