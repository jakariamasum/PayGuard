"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Payment } from "@prisma/client";

export default function RevenueChart({ payments }: { payments: Payment[] }) {
  const [chartData] = useState(() => {
    const data: { [key: string]: number } = {};
    payments.forEach((payment) => {
      const date = new Date(payment.created_at).toLocaleDateString();
      data[date] = (data[date] || 0) + payment.amount;
    });
    return Object.entries(data).map(([date, amount]) => ({ date, amount }));
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white p-4 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-semibold mb-4">Revenue Over Time</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
