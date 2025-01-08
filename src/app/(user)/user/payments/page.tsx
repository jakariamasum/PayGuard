"use client";
import { useEffect, useState } from "react";
import PaymentList from "./PaymentList";
import { useUser } from "@/context/user.context";
import { envConfig } from "@/envConfig";
export const dynamic = "force-dynamic";

const UserPayments = () => {
  const [payments, setPayments] = useState([]);
  const { user, setLoading } = useUser();
  const fetchPayments = async () => {
    try {
      if (!user?.id) {
        console.warn("User ID is missing. Skipping fetch.");
        return;
      }

      setLoading(true);
      const response = await fetch(
        `${envConfig.next_public}/api/payments?user_id=${user.id}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching payments: ${response.statusText}`);
      }

      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [user?.id]);
  return (
    <div>
      <PaymentList payments={payments} />
    </div>
  );
};

export default UserPayments;
