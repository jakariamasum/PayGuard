import { envConfig } from "@/envConfig";

export const getAllWithdraws = async () => {
  const res = await fetch(`${envConfig.next_public}/api/admin/withdrawals`);
  const data = await res.json();
  return data;
};

export const handleConfirmWithdrawal = async (id: string) => {
  const res = await fetch(`/api/admin/withdrawals/${id}/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const withdraw = await res.json();
  console.log("withdraws here", withdraw);
  return withdraw;
};
export const handleRejectWithdrawal = async (id: string) => {
  const res = await fetch(`/api/admin/withdrawals/${id}/reject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const withdraw = await res.json();
  console.log("withdraws here", withdraw);
  return withdraw;
};
