"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BiCreditCard } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";
import { FaDollarSign, FaUsers } from "react-icons/fa";

const stats = [
  {
    icon: <BiCreditCard className="w-8 h-8 text-blue-500" />,
    label: "Total Payments",
    value: "$15,231",
  },
  {
    icon: <FiFileText className="w-8 h-8 text-green-500" />,
    label: "Documents Processed",
    value: "1,205",
  },
  {
    icon: <FaDollarSign className="w-8 h-8 text-yellow-500" />,
    label: "Revenue",
    value: "$103,430",
  },
  {
    icon: <FaUsers className="w-8 h-8 text-purple-500" />,
    label: "Total Users",
    value: "3,291",
  },
];

const paymentData = [
  { name: "Jan", amount: 4000 },
  { name: "Feb", amount: 3000 },
  { name: "Mar", amount: 2000 },
  { name: "Apr", amount: 2780 },
  { name: "May", amount: 1890 },
  { name: "Jun", amount: 2390 },
];

export default function AdminDashboard() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-md p-6"
            {...fadeInUp}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-semibold text-black">
                  {stat.value}
                </p>
              </div>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="bg-white rounded-lg shadow-md p-6 mb-8"
        {...fadeInUp}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-black">
          Payment Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={paymentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
