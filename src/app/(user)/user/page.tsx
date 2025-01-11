// import DashboardWrapper from "@/components/user/DashboardWrapper";
import ActivityChart from "@/components/user/ActivityChart";
import DocumentStatus from "@/components/user/DocumentStatus";
import OverviewCards from "@/components/user/OverviewCard";
import PaymentHistory from "@/components/user/PaymentHistory";
import { getCurrentUser } from "@/services/userServices";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const userId = cookies().get("userId")?.value;
  const userData = await getCurrentUser(userId!);

  return (
    <main className="">
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
      </div>{" "}
    </main>
  );
}
