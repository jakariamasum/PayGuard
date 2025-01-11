"use client";

import { Payment } from "@prisma/client";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

interface PaymentHistoryProps {
  payments: Payment[];
}

export default function PaymentHistory({ payments }: PaymentHistoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white p-4 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-semibold mb-4">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>

              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((payment) => (
              <tr key={payment.id} className="border-t border-gray-200">
                <td className="px-4 py-2 whitespace-nowrap">{payment.title}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  ${payment.amount}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {payment.status === "approved" && (
                    <span className="flex items-center text-green-500">
                      <FaCheckCircle className="mr-1" />
                      Completed
                    </span>
                  )}
                  {payment.status === "pending" && (
                    <span className="flex items-center text-yellow-500">
                      <FaClock className="mr-1" />
                      Pending
                    </span>
                  )}
                  {payment.status === "canceled" && (
                    <span className="flex items-center text-red-500">
                      <FaTimesCircle className="mr-1" />
                      Failed
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap ">
                  {new Date(payment.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
