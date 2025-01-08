import { getAllPayments, getUserPayments } from "@/services/paymentServices";
import PaymentList from "./PaymentList";
export const dynamic = "force-dynamic";

const UserPayments = async () => {
  const payments = await getUserPayments(
    "30a7e57c-7b28-42d9-a8c4-3eef1d5b106f"
  );
  console.log(payments);
  const pay = await getAllPayments();
  console.log(pay);
  return (
    <div>
      <PaymentList payments={payments} />
    </div>
  );
};

export default UserPayments;
