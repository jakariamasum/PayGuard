import Link from "next/link";
import { FaTachometerAlt, FaCreditCard, FaFileAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  logout: () => Promise<void>;
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  logout,
}: SidebarProps) {
  return (
    <div
      className={`lg:w-64 bg-indigo-700 text-white ${
        sidebarOpen ? "block" : "hidden"
      } lg:block`}
    >
      <div className="flex justify-between items-center px-4 py-3 bg-indigo-800">
        <span className="text-lg font-semibold">My Dashboard</span>
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
          href="/user"
          className="flex items-center px-4 py-2 text-indigo-100 hover:bg-indigo-600"
        >
          <FaTachometerAlt className="mr-3" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/user/payments"
          className="flex items-center px-4 py-2 mt-1 text-indigo-100 hover:bg-indigo-600"
        >
          <FaCreditCard className="mr-3" />
          <span>Payments</span>
        </Link>
        <Link
          href="/user/documents"
          className="flex items-center px-4 py-2 mt-1 text-indigo-100 hover:bg-indigo-600"
        >
          <FaFileAlt className="mr-3" />
          <span>Documents</span>
        </Link>
        <button
          onClick={logout}
          className="flex items-center px-4 py-2 mt-1 text-red-400 hover:bg-red-600"
        >
          <BiLogOut className="mr-3" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}
