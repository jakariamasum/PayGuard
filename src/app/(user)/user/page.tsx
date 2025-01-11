// import DashboardWrapper from "@/components/user/DashboardWrapper";
import UserDashboard from "@/components/user/UserDashboard";
import { getCurrentUser } from "@/services/userServices";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const userId = cookies().get("userId")?.value;
  const userData = await getCurrentUser(userId!);

  return (
    <main className="min-h-screen bg-gray-50">
      <UserDashboard userData={userData} />
    </main>
  );
}
