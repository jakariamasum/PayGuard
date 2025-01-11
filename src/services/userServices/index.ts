import { envConfig } from "@/envConfig";

export const getAllUsers = async () => {
  const res = await fetch(`${envConfig.next_public}/api/users`, {
    cache: "no-store",
  });
  return await res.json();
};

export const deleteUser = async (id: string) => {
  console.log("before hit: ", id);
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  console.log("data get: ", data);
  return data;
};
