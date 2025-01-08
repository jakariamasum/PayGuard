import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import PDFDocument from "pdfkit";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const paymentId = searchParams.get("paymentId");
  const user_id = searchParams.get("user_id");

  if (!paymentId) {
    return NextResponse.json(
      { error: "Payment ID is required" },
      { status: 400 }
    );
  }

  try {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment || payment.user_id !== user_id) {
      return NextResponse.json(
        { error: "Payment not found or unauthorized" },
        { status: 404 }
      );
    }

    const pdfBuffer = await generateInvoicePDF(payment);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="invoice-${payment.id}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error downloading invoice:", error);
    return NextResponse.json(
      { error: "Failed to download invoice" },
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
