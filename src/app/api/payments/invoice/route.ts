import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Stripe from "stripe";
import PDFDocument from "pdfkit";
import { envConfig } from "@/envConfig";

const stripe = new Stripe(envConfig.stripe_secret_key!, {
  apiVersion: "2024-12-18.acacia",
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");
  const user_id = searchParams.get("user_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 }
    );
  }

  try {
    const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);
    const payment = await prisma.payment.findUnique({
      where: { id: stripeSession.metadata!.paymentId },
    });

    if (!payment || payment.user_id !== user_id) {
      return NextResponse.json(
        { error: "Payment not found or unauthorized" },
        { status: 404 }
      );
    }

    // Generate PDF invoice
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const pdfBuffer = await generateInvoicePDF(payment);

    const invoiceUrl = `/api/payments/invoice/download?paymentId=${payment.id}`;

    return NextResponse.json({ invoiceUrl });
  } catch (error) {
    console.error("Error generating invoice:", error);
    return NextResponse.json(
      { error: "Failed to generate invoice" },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function generateInvoicePDF(payment: any) {
  return new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument();
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // Add content to the PDF
    doc.fontSize(25).text("Invoice", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Invoice Number: ${payment.id}`);
    doc.text(`Date: ${new Date(payment.created_at).toLocaleDateString()}`);
    doc.moveDown();
    doc.text(`Title: ${payment.title}`);
    doc.text(`Amount: $${(payment.amount / 100).toFixed(2)}`);
    doc.moveDown();
    doc.text("Thank you for your business!");

    doc.end();
  });
}
