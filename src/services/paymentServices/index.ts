import { FieldValues } from "react-hook-form";

export const handlePayment = async (data: FieldValues) => {
  const res = await fetch("/api/payments", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
};
export const handlePaymentUpdate = async (id: string, status: string) => {
  const res = await fetch(`/api/payments/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, status }),
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
};

export const getAllPayments = async () => {
  const res = await fetch(`http://localhost:3000/api/payments`);
  return await res.json();
};
