"use client";

import { useState, useEffect } from "react";
import { FiDollarSign, FiCheckCircle, FiXCircle } from "react-icons/fi";

interface WithdrawalRequest {
  id: string;
  userId: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  console.log(withdrawals);

  const fetchWithdrawals = async () => {
    try {
      const response = await fetch("/api/admin/withdrawals");
      if (response.ok) {
        const data = await response.json();
        setWithdrawals(data);
      } else {
        console.error("Failed to fetch withdrawals");
      }
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    }
  };

  const handleConfirmWithdrawal = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/withdrawals/${id}/confirm`, {
        method: "POST",
      });
      if (response.ok) {
        fetchWithdrawals();
      } else {
        console.error("Failed to confirm withdrawal");
      }
    } catch (error) {
      console.error("Error confirming withdrawal:", error);
    }
  };

  const handleRejectWithdrawal = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/withdrawals/${id}/reject`, {
        method: "POST",
      });
      if (response.ok) {
        fetchWithdrawals();
      } else {
        console.error("Failed to reject withdrawal");
      }
    } catch (error) {
      console.error("Error rejecting withdrawal:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Withdrawal Requests</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {withdrawals.map((withdrawal) => (
            <li key={withdrawal.id}>
              <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                <div className="flex items-center">
                  <FiDollarSign className="h-6 w-6 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-indigo-600">
                      User ID: {withdrawal.userId}
                    </p>
                    <p className="text-sm text-gray-500">
                      Amount: ${(withdrawal.amount / 100).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Requested:{" "}
                      {new Date(withdrawal.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {withdrawal.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleConfirmWithdrawal(withdrawal.id)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        <FiCheckCircle className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleRejectWithdrawal(withdrawal.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      >
                        <FiXCircle className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  {withdrawal.status !== "pending" && (
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        withdrawal.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {withdrawal.status}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
