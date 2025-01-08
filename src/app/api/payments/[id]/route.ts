import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { status } = await request.json();
  // check payment exits or not
  const existingPayment = await prisma.payment.findUnique({
    where: {
      id,
    },
  });
  if (!existingPayment) {
    return NextResponse.json({ message: "Payment not found" }, { status: 404 });
  }

  // procced to update payment
  const updatedPayment = await prisma.payment.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  return NextResponse.json(updatedPayment, { status: 201 });
}
