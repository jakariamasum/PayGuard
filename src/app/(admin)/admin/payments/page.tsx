"use client";

import { envConfig } from "@/envConfig";
import { handlePaymentUpdate } from "@/services/paymentServices";
import { useEffect, useState } from "react";
import { BiCheck, BiChevronDown, BiX } from "react-icons/bi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";

type Payment = {
  id: string;
  user: { id: string; email: string };
  amount: number;
  created_at: string;
  status: "pending" | "approved" | "canceled";
};

const PaymentPage = () => {
  const [payments, setPayments] = useState<Payment[]>([]);

  const groupPaymentsByDate = (payments: Payment[]) => {
    const grouped: Record<string, number> = {};

    payments.forEach((payment) => {
      if (!grouped[payment.created_at]) {
        grouped[payment.created_at] = 0;
      }
      grouped[payment.created_at] += payment.amount;
    });

    return Object.entries(grouped).map(([date, amount]) => ({ date, amount }));
  };

  const paymentTrendData = groupPaymentsByDate(payments);

  const fetchPayments = async () => {
    try {
      const res = await fetch(`${envConfig.next_public}/api/payments`);
      const data = await res.json();
      setPayments(data);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [dateFilter, setDateFilter] = useState<string>("");

  const filteredPayments = payments.filter(
    (payment) =>
      (statusFilter === "All" || payment.status === statusFilter) &&
      (dateFilter === "" || payment.created_at >= dateFilter)
  );

  const handleUpdate = async (id: string, status: string) => {
    const res = await handlePaymentUpdate(id, status);
    if (res) {
      toast.success("Status changed");
      fetchPayments();
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-black">Payment Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={paymentTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#3B82F6" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-wrap gap-4 mb-4">
          <div>
            <label
              htmlFor="status-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <div className="relative">
              <select
                id="status-filter"
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value={"All"}>All</option>
                <option value={"pending"}>Pending</option>
                <option value={"approved"}>Approved</option>
                <option value={"canceled"}>Rejected</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <BiChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="date-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              From Date
            </label>
            <input
              type="date"
              id="date-filter"
              className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {payment.user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.created_at}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "canceled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {payment.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleUpdate(payment.id, "approved")}
                          className="text-green-600 hover:text-green-900 mr-2"
                        >
                          <BiCheck className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleUpdate(payment.id, "canceled")}
                          className="text-red-600 hover:text-red-900"
                        >
                          <BiX className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
