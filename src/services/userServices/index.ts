import { envConfig } from "@/envConfig";

export const getAllUsers = async () => {
  const res = await fetch(`${envConfig.next_public}/api/users`, {
    cache: "no-store",
  });
  return await res.json();
};
export const getCurrentUser = async (id: string) => {
  console.log("hit :", id);
  if (id === "guest-user-id") {
    return {
      user: { id: "guest-user-id", email: "guest@example.com" },
      payments: [],
      documents: [],
    };
  }
  const res = await fetch(`${envConfig.next_public}/api/users/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  console.log(id, data);
  return data;
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
