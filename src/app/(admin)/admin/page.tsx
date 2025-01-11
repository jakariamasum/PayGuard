import DocumentStatus from "@/components/admin/DocumentStatus";
import OverviewCards from "@/components/admin/OverviewCards";
import RecentTransactions from "@/components/admin/RecentTransaction";
import RevenueChart from "@/components/admin/RevenueChart";
import UserActivityChart from "@/components/admin/UserActivity";
import { getAdminData } from "@/services/adminServices";
import { cookies } from "next/headers";

export default async function Home() {
  const userId = cookies().get("userId")?.value;
  const admin = await getAdminData(userId!);
  return (
    <div className="">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      <OverviewCards
        users={admin.users}
        payments={admin.payments}
        documents={admin.documents}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RevenueChart payments={admin.payments} />
        <UserActivityChart users={admin.users} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <RecentTransactions payments={admin.payments} />
        <DocumentStatus documents={admin.documents} />
      </div>
    </div>
  );
}
