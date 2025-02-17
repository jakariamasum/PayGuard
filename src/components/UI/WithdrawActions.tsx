import {
  handleConfirmWithdrawal,
  handleRejectWithdrawal,
} from "@/services/withdrowServices";
import { WithdrawalRequest } from "@/types/withdraws.types";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const WithdrawActions = ({ withdrawal }: { withdrawal: WithdrawalRequest }) => {
  return (
    <div className="flex items-center">
      {withdrawal.status === "pending" && (
        <>
          <button
            onClick={() => handleConfirmWithdrawal(withdrawal.id)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
          >
            <FiCheckCircle className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleRejectWithdrawal(withdrawal.id)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            <FiXCircle className="h-5 w-5" />
          </button>
        </>
      )}
      {withdrawal.status !== "pending" && (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            withdrawal.status === "approved"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {withdrawal.status}
        </span>
      )}
    </div>
  );
};

export default WithdrawActions;
