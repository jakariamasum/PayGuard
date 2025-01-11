import { envConfig } from "@/envConfig";

export const getAdminData = async (id: string) => {
  const res = await fetch(`${envConfig.next_public}/api/admin?id=${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  console.log("admin data: ", data);
  return data;
};
