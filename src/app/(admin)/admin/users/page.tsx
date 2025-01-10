import React from "react";
import UserList from "./UserList";
import { getAllUsers } from "@/services/userServices";
export const dynamic = "force-dynamic";

const AllUserPage = async () => {
  const users = await getAllUsers();
  return (
    <div className="container mx-auto py-10 px-4">
      <UserList users={users} />
    </div>
  );
};

export default AllUserPage;
