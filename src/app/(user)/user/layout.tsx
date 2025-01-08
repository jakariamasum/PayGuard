"use client";

import { useState } from "react";
import { useUser } from "@/context/user.context";
import Link from "next/link";
import { BiMenu, BiX } from "react-icons/bi";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/user" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-blue-600">
                  PayGuard
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              <NavLink href="/user" exact>
                Dashboard
              </NavLink>
              <NavLink href="/user/payments">Payments</NavLink>
              <NavLink href="/user/documents">Documents</NavLink>
              <button
                onClick={logout}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Logout
              </button>
            </div>
            <div className="flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <BiX className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <BiMenu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`sm:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <div className="pt-2 pb-3 space-y-1">
            <MobileNavLink href="/user" exact>
              Dashboard
            </MobileNavLink>
            <MobileNavLink href="/user/payments">Payments</MobileNavLink>
            <MobileNavLink href="/user/documents">Documents</MobileNavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

const NavLink = ({
  href,
  children,
  exact = false,
}: {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
}) => {
  const isActive =
    typeof window !== "undefined" &&
    (exact
      ? window.location.pathname === href
      : window.location.pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`${
        isActive
          ? "border-blue-500 text-gray-900"
          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({
  href,
  children,
  exact = false,
}: {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
}) => {
  const isActive =
    typeof window !== "undefined" &&
    (exact
      ? window.location.pathname === href
      : window.location.pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`${
        isActive
          ? "bg-blue-50 border-blue-500 text-blue-700"
          : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
      } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
    >
      {children}
    </Link>
  );
};

export default UserLayout;
