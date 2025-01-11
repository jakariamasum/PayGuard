import { Document, Payment, User } from "@prisma/client";
import { FaUsers, FaFileAlt, FaCreditCard, FaChartLine } from "react-icons/fa";

interface OverviewCardsProps {
  users: User[];
  payments: Payment[];
  documents: Document[];
}

export default function OverviewCards({
  users,
  payments,
  documents,
}: OverviewCardsProps) {
  const totalRevenue = payments?.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );
  const pendingDocuments = documents?.filter(
    (doc) => doc?.status === "pending"
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        title="Total Users"
        value={(users?.length).toString()}
        icon={<FaUsers className="w-6 h-6 text-blue-500" />}
        color="bg-blue-100"
      />
      <Card
        title="Total Revenue"
        value={`$${totalRevenue.toLocaleString()}`}
        icon={<FaChartLine className="w-6 h-6 text-green-500" />}
        color="bg-green-100"
      />
      <Card
        title="Pending Documents"
        value={pendingDocuments.toString()}
        icon={<FaFileAlt className="w-6 h-6 text-yellow-500" />}
        color="bg-yellow-100"
      />
      <Card
        title="Total Payments"
        value={(payments?.length).toString()}
        icon={<FaCreditCard className="w-6 h-6 text-purple-500" />}
        color="bg-purple-100"
      />
    </div>
  );
}
interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

function Card({ title, value, icon, color }: CardProps) {
  return (
    <div className={`p-4 rounded-lg shadow-md ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}
