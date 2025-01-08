"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuLayoutDashboard } from "react-icons/lu";
import { BiCreditCard, BiLogOut, BiMenu, BiX } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const sidebarItems = [
    {
      icon: <LuLayoutDashboard className="w-6 h-6" />,
      label: "Dashboard",
      href: "/admin",
    },
    {
      icon: <BiCreditCard className="w-6 h-6" />,
      label: "Payments",
      href: "/admin/payments",
    },
    {
      icon: <FiFileText className="w-6 h-6" />,
      label: "Documents",
      href: "/admin/documents",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link
                  href="/admin"
                  className="text-2xl font-bold text-blue-600"
                >
                  PayGuard Admin
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="p-2">
                <BiMenu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50"
          >
            <div className="p-4">
              <button onClick={toggleSidebar} className="p-2 float-right">
                <BiX className="h-6 w-6" />
              </button>
              <div className="mt-16">
                {sidebarItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Link>
                ))}
                <Link
                  href="/logout"
                  className="flex items-center p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 text-red-600"
                >
                  <BiLogOut className="w-6 h-6" />
                  <span className="ml-2">Logout</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
};
export default AdminLayout;
