import UserLayout from "@/components/layout/UserLayout";
import { getCurrentUser } from "@/services/userServices";
import { cookies } from "next/headers";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const userId = cookies().get("userId")?.value;
  const userData = await getCurrentUser(userId!);

  return <UserLayout userData={userData}>{children}</UserLayout>;
};

export default Layout;
