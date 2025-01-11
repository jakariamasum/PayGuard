import { IUserData } from "@/types/user.types";
import { FaCreditCard, FaFileAlt, FaChartLine } from "react-icons/fa";

interface OverviewCardsProps {
  userData: IUserData;
}

export default function OverviewCards({ userData }: OverviewCardsProps) {
  const totalPayments = userData?.payments?.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );
  const pendingDocuments = userData?.documents?.filter(
    (doc) => doc.status === "pending"
  )?.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card
        title="Total Payments"
        value={`$${totalPayments.toLocaleString()}`}
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
        title="Recent Payment"
        value={
          userData?.payments[0] ? `$${userData?.payments[0]?.amount}` : "N/A"
        }
        icon={<FaCreditCard className="w-6 h-6 text-blue-500" />}
        color="bg-blue-100"
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
