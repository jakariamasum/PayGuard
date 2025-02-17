import WithdrawActions from "@/components/UI/WithdrawActions";
import { getAllWithdraws } from "@/services/withdrowServices";
import { WithdrawalRequest } from "@/types/withdraws.types";
import { FiDollarSign } from "react-icons/fi";

export default async function AdminWithdrawals() {
  const withdrawals: WithdrawalRequest[] = await getAllWithdraws();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Withdrawal Requests</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {withdrawals?.map((withdrawal) => (
            <li key={withdrawal.id}>
              <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                <div className="flex items-center">
                  <FiDollarSign className="h-6 w-6 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-indigo-600">
                      User: {withdrawal.user.email}
                    </p>
                    <p className="text-sm text-gray-500">
                      Amount: ${(withdrawal.amount / 100).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Requested:{" "}
                      {new Date(withdrawal.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <WithdrawActions withdrawal={withdrawal} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
