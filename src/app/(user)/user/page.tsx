/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useUser } from "@/context/user.context";
import { useEffect, useState } from "react";
import { BiCheckCircle, BiCreditCard, BiUser } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { FiActivity, FiAlertCircle } from "react-icons/fi";

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const { user } = useUser();

  useEffect(() => {
    // Simulate fetching data from an API or database
    const fetchData = async () => {
      const userData = {
        accountStatus: "Active",
        recentActivities: [
          { action: "Updated profile", date: "2025-01-09" },
          { action: "Requested payment", date: "2025-01-07" },
        ],
        paymentsOverview: {
          totalRequests: 3,
          pendingRequests: 1,
          approvedRequests: 2,
        },
      };
      setData(userData);
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6 space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          User Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile */}
          <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 rounded-full p-3">
                <BiUser className="h-12 w-12 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user?.email.split("@")}
                </h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium text-gray-500 mr-2">
                Account Status:
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                {data.accountStatus}
              </span>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiActivity className="h-5 w-5 mr-2 text-blue-500" />
              Recent Activities
            </h2>
            <div className="space-y-4">
              {data.recentActivities.map((activity: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-200 pb-2 last:border-b-0 last:pb-0"
                >
                  <span className="text-gray-700">{activity.action}</span>
                  <span className="text-sm text-gray-500">{activity.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payments Overview */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BiCreditCard className="h-5 w-5 mr-2 text-blue-500" />
              Payments Overview
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Requests</span>
                <span className="text-2xl font-semibold text-gray-800">
                  {data.paymentsOverview.totalRequests}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pending</span>
                <div className="flex items-center">
                  <BsClock className="h-4 w-4 mr-1 text-yellow-500" />
                  <span className="text-lg font-medium text-yellow-500">
                    {data.paymentsOverview.pendingRequests}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Approved</span>
                <div className="flex items-center">
                  <BiCheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  <span className="text-lg font-medium text-green-500">
                    {data.paymentsOverview.approvedRequests}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiAlertCircle className="h-5 w-5 mr-2 text-blue-500" />
              Account Status
            </h2>
            <div className="mt-4 text-gray-700">
              <p className="flex items-center">
                <span className="font-semibold mr-2">Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    data.accountStatus === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {data.accountStatus}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
