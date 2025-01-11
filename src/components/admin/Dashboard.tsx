/* eslint-disable @typescript-eslint/no-explicit-any */

import OverviewCards from "./OverviewCards";
import RevenueChart from "./RevenueChart";
import DocumentStatus from "./DocumentStatus";
import UserActivityChart from "./UserActivity";
import RecentTransactions from "./RecentTransaction";
import { Payment, User } from "@prisma/client";

export default function Dashboard({
  users,
  payments,
  documents,
}: {
  users: User[];
  payments: Payment[];
  documents: any[];
}) {
  return (
    <div className="">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      <OverviewCards users={users} payments={payments} documents={documents} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RevenueChart payments={payments} />
        <UserActivityChart users={users} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RecentTransactions payments={payments} />
        <DocumentStatus documents={documents} />
      </div>
    </div>
  );
}
