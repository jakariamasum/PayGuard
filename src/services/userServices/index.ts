import { envConfig } from "@/envConfig";

export const getAllUsers = async () => {
  const res = await fetch(`${envConfig.next_public}/api/users`);
  return await res.json();
};
