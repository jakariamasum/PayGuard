import { envConfig } from "@/envConfig";
import { FieldValues } from "react-hook-form";

export const handlePayment = async (data: FieldValues) => {
  const res = await fetch("/api/payments", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  const stripe = await res.json();
  window.location.href = stripe.url;
  return stripe.url;
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
  const res = await fetch(`${envConfig.next_public}/api/payments`);
  const data = await res.json();
  return data;
};
export const getUserPayments = async (id: string) => {
  const res = await fetch(
    `${envConfig.next_public}/api/payments?user_id=${id}`
  );
  const data = await res.json();
  return data;
};
