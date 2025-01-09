"use client";

import { useState } from "react";
import { Payment, StatusType } from "@prisma/client";
import { BiCheckCircle, BiPlusCircle } from "react-icons/bi";
import { FiAlertCircle, FiFileText } from "react-icons/fi";
import PaymentModal from "@/components/modal/PaymentModal";
import { envConfig } from "@/envConfig";

interface PaymentListProps {
  payments: Payment[];
}

const PaymentList = ({ payments }: PaymentListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerateInvoice = async (paymentId: string) => {
    console.log(`Generating invoice for payment ${paymentId}`);
    const response = await fetch(
      `${envConfig.next_public}/api/payments/invoice?id=${paymentId}`
    );

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Invoice_${paymentId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      console.error("Failed to generate invoice");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Payment History</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <BiPlusCircle className="mr-2 h-5 w-5" />
          New Payment
        </button>
      </div>
      {payments && payments.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {payments?.map((payment) => (
              <li key={payment.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition duration-150 ease-in-out">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FiFileText className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400" />
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {payment.title}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          payment.status === StatusType.approved
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {payment.status === StatusType.approved ? (
                          <BiCheckCircle className="mr-1 h-4 w-4" />
                        ) : (
                          <FiAlertCircle className="mr-1 h-4 w-4" />
                        )}
                        {payment.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Amount: ${(payment.amount / 100).toFixed(2)}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>{new Date(payment.created_at).toLocaleDateString()}</p>
                      {payment.status === StatusType.approved && (
                        <button
                          onClick={() => handleGenerateInvoice(payment.id)}
                          className="ml-4 text-indigo-600 hover:text-indigo-800"
                        >
                          Generate Invoice
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-white p-6 rounded-md shadow-md text-center">
          <h3 className="text-lg font-medium text-gray-700">
            No payment history found
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Create a new payment request to get started.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <BiPlusCircle className="mr-2 h-5 w-5" />
            New Payment
          </button>
        </div>
      )}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default PaymentList;
