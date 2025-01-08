"use client";

import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import Button from "../UI/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPay: () => void;
  title?: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  onPay,
  children,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative w-full max-w-3xl mx-4 overflow-hidden bg-white rounded-lg shadow-lg lg:mx-0 md:max-w-xl"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-black">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t">
          <Button variant="danger" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onPay}>Pay Now</Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
