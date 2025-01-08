import { envConfig } from "@/envConfig";

export const getUserDocuments = async (id: string) => {
  const res = await fetch(
    `${envConfig.next_public}/api/documents?user_id=${id}`
  );
  return await res.json();
};
export const getAllDocuments = async () => {
  const res = await fetch(`${envConfig.next_public}/api/documents`);
  return await res.json();
};

export const handleDocUpdate = async (id: string, status: string) => {
  const res = await fetch("/api/documents", {
    method: "PUT",
    body: JSON.stringify({ id, status }),
    headers: { "Content-Type": "application/json" },
  });
  const test = await res.json();
  console.log("update here", test);
  return test;
};
