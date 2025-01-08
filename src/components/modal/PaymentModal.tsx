"use client";

import { useState } from "react";
import PGForm from "../form/PGForm";
import Modal from "./PGModal";
import PGInput from "../form/PGInput";
import { CgNametag } from "react-icons/cg";
import { BiDollar } from "react-icons/bi";

interface NewPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, amount: number) => void;
}

const PaymentModal = ({ isOpen, onClose, onSubmit }: NewPaymentModalProps) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, parseFloat(amount) * 100); // Convert to cents
    setTitle("");
    setAmount("");
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Payment">
      <PGForm onSubmit={handleSubmit}>
        <div className="space-y-4">
          <PGInput
            type="text"
            name="title"
            label="Title"
            placeholder="Write here.."
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
      </PGForm>
    </Modal>
  );
};

export default PaymentModal;
