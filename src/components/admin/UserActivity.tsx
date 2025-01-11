"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { User } from "@prisma/client";

export default function UserActivityChart({ users }: { users: User[] }) {
  const [chartData] = useState(() => {
    const data: { [key: string]: number } = {};
    users?.forEach((user: User) => {
      const date = new Date(user.created_at).toLocaleDateString();
      data[date] = (data[date] || 0) + 1;
    });
    return Object.entries(data).map(([date, count]) => ({ date, count }));
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white p-4 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-semibold mb-4">User Registrations</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
