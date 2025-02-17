export interface WithdrawalRequest {
  id: string;
  user: {
    id: string;
    email: string;
    balance: number;
    stripeAccountId: string;
  };
  amount: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}
