/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { StatusType } from "@prisma/client";
import { generateInvoice } from "@/utils/generateInvoice";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  console.log("pay id: ", id);

  if (!id) {
    return NextResponse.json(
      { message: "Payment ID is required" },
      { status: 400 }
    );
  }
  // Fetch payment and user from the database
  const payment = await prisma.payment.findUnique({
    where: { id },
  });

  if (!payment) {
    return NextResponse.json({ message: "Payment not found" }, { status: 404 });
  }

  if (payment.status !== StatusType.approved) {
    return NextResponse.json(
      { message: "Invoice can only be generated for approved payments" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: payment.user_id },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Generate the invoice
  const filePath = await generateInvoice(payment, user, true);

  if (!filePath) {
    return NextResponse.json(
      { message: "Failed to generate invoice" },
      { status: 500 }
    );
  }

  // Stream the file as a download response
  const fileStream = fs.createReadStream(filePath);
  const response = new NextResponse(fileStream as any, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${path.basename(filePath)}`,
    },
  });

  return response;
}
