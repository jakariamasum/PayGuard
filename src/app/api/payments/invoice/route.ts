import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { StatusType } from "@prisma/client";
import { generateInvoice } from "@/utils/generateInvoice";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

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
      return NextResponse.json(
        { message: "Payment not found" },
        { status: 404 }
      );
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
    const pdfBuffer = await generateInvoice(payment, user);

    // Return the PDF as a download
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=Invoice_${payment.id}.pdf`,
      },
    });
  } catch (error) {
    console.error("Error generating invoice:", error);
    return NextResponse.json(
      { message: "An error occurred while generating the invoice" },
      { status: 500 }
    );
  }
}
