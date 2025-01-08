"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { BiMenu, BiX } from "react-icons/bi";
import { useUser } from "@/context/user.context";
import Button from "./UI/Button";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              PayGuard
            </Link>
          </motion.div>
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-indigo-600 transition duration-300"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
          {!user ? (
            <div className="hidden md:flex space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/login"
                  className="text-indigo-600 hover:text-indigo-800 transition duration-300"
                >
                  Login
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                >
                  Sign Up
                </Link>
              </motion.div>
            </div>
          ) : (
            <div className="hidden md:flex space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button onClick={logout}>Logout</Button>
              </motion.div>
            </div>
          )}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <BiX className="h-6 w-6" />
              ) : (
                <BiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-700 hover:text-indigo-600 transition duration-300"
              >
                {item.name}
              </Link>
            ))}
            {!user ? (
              <div>
                {" "}
                <Link
                  href="/login"
                  className="block py-2 text-indigo-600 hover:text-indigo-800 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block py-2 text-indigo-600 hover:text-indigo-800 transition duration-300"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <Button onClick={logout}>Logout </Button>
            )}
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;
