"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Sidebar from "./Sidebar";
import OverviewCards from "./OverviewCard";
import PaymentHistory from "./PaymentHistory";
import DocumentStatus from "./DocumentStatus";
import ActivityChart from "./ActivityChart";
import { IUserData } from "@/types/user.types";
import { useUser } from "@/context/user.context";
interface UserDashboardProps {
  userData: IUserData;
}

export default function UserDashboard({ userData }: UserDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useUser();
  console.log("user data: ", userData.email);

  return (
    <div className="flex h-screen overflow-hidden text-black">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        logout={logout}
      />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          userData={userData}
        />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-grow p-4 sm:p-6 lg:p-8"
        >
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Welcome back, {userData?.email?.split("@")[0]}!
          </h1>
          <OverviewCards userData={userData!} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <ActivityChart payments={userData?.payments} />
            <DocumentStatus documents={userData?.documents} />
          </div>
          <div className="mt-6">
            <PaymentHistory payments={userData?.payments} />
          </div>
        </motion.main>
      </div>
    </div>
  );
}
