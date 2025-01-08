export const getUserDocuments = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/documents?user_id=${id}`);
  return await res.json();
};
export const getAllDocuments = async () => {
  const res = await fetch(`http://localhost:3000/api/documents`);
  return await res.json();
};
