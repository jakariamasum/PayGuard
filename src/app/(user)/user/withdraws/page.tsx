"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { FiDollarSign } from "react-icons/fi";

interface WithdrawalRequest {
  id: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function UserWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      const response = await fetch("/api/withdrawals");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/withdrawals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: Number.parseFloat(amount) * 100 }),
      });
      if (response.ok) {
        setAmount("");
        fetchWithdrawals();
      } else {
        console.error("Failed to submit withdrawal request");
      }
    } catch (error) {
      console.error("Error submitting withdrawal request:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Withdrawals</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-center">
          <label htmlFor="amount" className="mr-2">
            Amount ($):
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border rounded px-2 py-1 mr-2"
            min="0"
            step="0.01"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Request Withdrawal
          </button>
        </div>
      </form>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {withdrawals.map((withdrawal) => (
            <li key={withdrawal.id}>
              <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                <div className="flex items-center">
                  <FiDollarSign className="h-6 w-6 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-indigo-600">
                      Amount: ${(withdrawal.amount / 100).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Requested:{" "}
                      {new Date(withdrawal.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    withdrawal.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : withdrawal.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {withdrawal.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
