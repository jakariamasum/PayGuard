/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { Payment, User } from "@prisma/client";

export const generateInvoice = async (
  payment: Payment,
  user: User,
  saveToFile: boolean = false
): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const invoiceDir = path.join(process.cwd(), "public", "invoices");
    const filePath = path.join(invoiceDir, `Invoice_${payment.id}.pdf`);

    // Ensure the invoices directory exists
    if (!fs.existsSync(invoiceDir)) {
      fs.mkdirSync(invoiceDir, { recursive: true });
    }

    const stream = saveToFile ? fs.createWriteStream(filePath) : undefined;

    doc.pipe(stream || new (require("stream").PassThrough)());

    // Invoice Header
    doc.fontSize(20).text("INVOICE", { align: "center" }).moveDown();

    // Customer Details
    doc.fontSize(12).text(`Email: ${user.email}`).moveDown();

    // Payment Details
    doc
      .text(`Invoice ID: ${payment.id}`)
      .text(`Title: ${payment.title}`)
      .text(`Amount: $${(payment.amount / 100).toFixed(2)}`)
      .text(`Date: ${new Date(payment.created_at).toLocaleDateString()}`)
      .text(`Status: ${payment.status}`)
      .moveDown();

    // Footer
    doc
      .moveDown()
      .fontSize(10)
      .text("Thank you for your payment!", { align: "center" });

    // Finalize PDF
    doc.end();

    if (saveToFile) {
      stream?.on("finish", () => resolve(filePath));
      stream?.on("error", reject);
    } else {
      resolve();
    }
  });
};
