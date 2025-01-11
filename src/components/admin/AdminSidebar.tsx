"use client";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import {
  FaTachometerAlt,
  FaUsers,
  FaFileAlt,
  FaCreditCard,
} from "react-icons/fa";
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  logout: () => Promise<void>;
}
export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
  logout,
}: SidebarProps) {
  return (
    <div
      className={`lg:w-64 bg-gray-800 text-white ${
        sidebarOpen ? "block" : "hidden"
      } lg:block`}
    >
      <div className="flex justify-between items-center px-4 py-3 bg-gray-900">
        <span className="text-lg font-semibold">Admin Dashboard</span>
        <button
          className="text-white hover:text-gray-200 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <span className="sr-only">Close sidebar</span>
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
      </div>
      <nav className="mt-5">
        <Link
          href="/admin"
          className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
        >
          <FaTachometerAlt className="mr-3" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/admin/users"
          className="flex items-center px-4 py-2 mt-1 text-gray-300 hover:bg-gray-700"
        >
          <FaUsers className="mr-3" />
          <span>Users</span>
        </Link>
        <Link
          href="/admin/documents"
          className="flex items-center px-4 py-2 mt-1 text-gray-300 hover:bg-gray-700"
        >
          <FaFileAlt className="mr-3" />
          <span>Documents</span>
        </Link>
        <Link
          href="/admin/payments"
          className="flex items-center px-4 py-2 mt-1 text-gray-300 hover:bg-gray-700"
        >
          <FaCreditCard className="mr-3" />
          <span>Payments</span>
        </Link>
        <button
          onClick={logout}
          className="flex items-center px-4 py-2 mt-1 text-red-300 hover:text-red-700"
        >
          <BiLogOut className="mr-3" />
          <span>Logut</span>
        </button>
      </nav>
    </div>
  );
}
