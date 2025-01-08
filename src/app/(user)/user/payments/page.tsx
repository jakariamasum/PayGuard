import { getAllPayments } from "@/services/paymentServices";
import PaymentList from "./PaymentList";

const UserPayments = async () => {
  const payments = await getAllPayments();
  return (
    <div>
      <PaymentList payments={payments} />
    </div>
  );
};

export default UserPayments;
