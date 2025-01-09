/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Payment, User } from "@prisma/client";

export const generateInvoice = async (
  payment: Payment,
  user: User
): Promise<Uint8Array> => {
  const doc = new jsPDF();

  // Colors
  const textColor = "#333333";
  const greenColor = "#2E7D32";
  const grayBg = "#f5f5f5";

  // Header section
  doc.setFontSize(24);
  doc.setTextColor(textColor);
  doc.text("PayGuard", 15, 20);

  // Paid status
  doc.setFillColor(greenColor);
  doc.rect(150, 10, 45, 20, "F");
  doc.setTextColor("#ffffff");
  doc.setFontSize(16);
  doc.text("PAID", 172, 23, { align: "center" });

  // Order details (top right)
  doc.setTextColor(textColor);
  doc.setFontSize(11);
  doc.text(`Order ID: #${payment.id}`, 195, 40, { align: "right" });
  doc.text(
    `Date of purchase: ${new Date(payment.created_at).toLocaleDateString()}`,
    195,
    47,
    { align: "right" }
  );

  // Company details (left column)
  doc.setFontSize(12);
  doc.text("PayGuard", 15, 60);
  doc.setFontSize(11);
  doc.text("Busy Street,  Awal Centre, Dhaka", 15, 67);
  doc.text("Dhaka", 15, 74);
  doc.text("info@payguard.com", 15, 81);
  doc.text("+8801234567891", 15, 88);

  // Customer details (right column)
  doc.setFontSize(12);
  doc.text("Customer Details", 140, 60);
  doc.text(user.email.split("@")[0] || "Customer Name", 140, 60);
  doc.setFontSize(11);
  doc.text(user.email, 140, 67);

  // Payment method section
  doc.setFillColor(grayBg);
  doc.rect(15, 100, 180, 20, "F");
  doc.setFontSize(11);
  doc.setTextColor(textColor);
  doc.text("Payment Method", 25, 112);
  doc.text("Payment Info #", 140, 112);

  doc.setFontSize(11);
  doc.text("bkash", 25, 130);
  doc.text("+881111111111", 140, 130);
  doc.text(payment.id, 140, 137);

  // Items table
  (doc as any).autoTable({
    startY: 150,
    head: [["Item", "Price"]],
    body: [[payment.title, `${(payment.amount * 100).toFixed(2)} tk`]],
    theme: "plain",
    headStyles: {
      fillColor: "#ffffff",
      textColor: textColor,
      fontStyle: "bold",
      cellPadding: 5,
    },
    bodyStyles: {
      textColor: textColor,
      cellPadding: 5,
    },
    columnStyles: {
      0: { cellWidth: 140 },
      1: { cellWidth: 40, halign: "right" },
    },
    margin: { left: 15, right: 15 },
  });

  // Total section
  const finalY = (doc as any).lastAutoTable.finalY || 180;
  doc.setFontSize(11);
  doc.text("Subtotal:", 140, finalY + 20);
  doc.text(`${(payment.amount * 100).toFixed(2)} tk`, 195, finalY + 20, {
    align: "right",
  });

  doc.text("Discount:", 140, finalY + 27);
  doc.text("0 tk", 195, finalY + 27, { align: "right" });

  doc.setFontSize(12);
  doc.setFont("", "bold");
  doc.text("Total:", 140, finalY + 37);
  doc.text(`${(payment.amount * 100).toFixed(2)} tk`, 195, finalY + 37, {
    align: "right",
  });

  // Convert ArrayBuffer to Uint8Array
  const arrayBuffer = doc.output("arraybuffer");
  return new Uint8Array(arrayBuffer);
};
