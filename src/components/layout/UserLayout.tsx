"use client";
import { IUserData } from "@/types/user.types";
import Sidebar from "@/components/user/Sidebar";
import { useUser } from "@/context/user.context";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import Header from "../user/Header";
interface UserDashboardProps {
  userData: IUserData;
  children: ReactNode;
}

const UserLayout = ({ userData, children }: UserDashboardProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useUser();
  return (
    <div className="flex h-screen overflow-hidden text-black bg-white">
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
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default UserLayout;
