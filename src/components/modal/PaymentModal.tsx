"use client";

import PGForm from "../form/PGForm";
import Modal from "./PGModal";
import PGInput from "../form/PGInput";
import { CgNametag } from "react-icons/cg";
import { BiDollar } from "react-icons/bi";
import { FieldValues } from "react-hook-form";
import { handlePayment } from "@/services/paymentServices";
import { useUser } from "@/context/user.context";

interface NewPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal = ({ isOpen, onClose }: NewPaymentModalProps) => {
  const { user } = useUser();
  console.log("user form pay: ", user);
  const handleSubmit = async (data: FieldValues) => {
    try {
      const payload = {
        ...data,
        user_id: user?.id,
      };
      console.log("Form data submitted: ", payload);
      const url = await handlePayment(payload);
      console.log("red: ", url);
      window.location.href = url;
      onClose();
    } catch (error) {
      console.error("Error during payment submission:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <PGForm onSubmit={handleSubmit}>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onPay={() =>
          document
            .querySelector<HTMLFormElement>("form")
            ?.dispatchEvent(
              new Event("submit", { cancelable: true, bubbles: true })
            )
        }
        title="Create Payment"
      >
        <div className="space-y-4">
          <PGInput
            type="text"
            name="title"
            label="Title"
            placeholder="Write here..."
            icon={<CgNametag />}
          />
          <PGInput
            type="number"
            name="amount"
            label="Amount"
            placeholder="10"
            icon={<BiDollar />}
          />
        </div>
      </Modal>
    </PGForm>
  );
};

export default PaymentModal;
