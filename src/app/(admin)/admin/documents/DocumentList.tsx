"use client";

import { envConfig } from "@/envConfig";
import { handleDocUpdate } from "@/services/documentServices";
import { useEffect, useState } from "react";
import { BiCheck, BiChevronDown, BiX } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { toast } from "sonner";

type Document = {
  id: string;
  user: { id: string; email: string };
  file_url: string;
  uploaded_at: string;
  status: "pending" | "approved" | "canceled";
};

const COLORS = ["#FFBB28", "#00C49F", "#FF8042"];

const DocumentList = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const fetchDocuments = async () => {
    try {
      const res = await fetch(`${envConfig.next_public}/api/documents`);
      const data = await res.json();
      setDocuments(data);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);
  const statusCount = documents?.reduce(
    (acc, doc) => {
      if (doc.status === "pending") acc.pending++;
      if (doc.status === "approved") acc.approved++;
      if (doc.status === "canceled") acc.canceled++;
      return acc;
    },
    { pending: 0, approved: 0, canceled: 0 }
  );
  const documentStatusData = [
    { name: "Pending", value: statusCount.pending },
    { name: "Approved", value: statusCount.approved },
    { name: "Rejected", value: statusCount.canceled },
  ];
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [dateFilter, setDateFilter] = useState<string>("");

  const filteredDocuments = documents?.filter(
    (document) =>
      (statusFilter === "All" || document.status === statusFilter) &&
      (dateFilter === "" || document.uploaded_at >= dateFilter)
  );

  const handleUpdate = async (id: string, status: string) => {
    const res = await handleDocUpdate(id, status);
    if (res) {
      toast.success("Status changed");
      fetchDocuments();
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Document Status Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={documentStatusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {documentStatusData?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-wrap gap-4 mb-4">
          <div>
            <label
              htmlFor="status-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <div className="relative">
              <select
                id="status-filter"
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value={"All"}>All</option>
                <option value={"pending"}>Pending</option>
                <option value={"approved"}>Approved</option>
                <option value={"canceled"}>Rejected</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <BiChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="date-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              From Date
            </label>
            <input
              type="date"
              id="date-filter"
              className="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments?.map((document) => (
                <tr key={document.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {document.user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <FiFileText className="h-5 w-5 text-gray-400 mr-2" />
                      {document?.file_url?.split("/")?.pop()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {document.uploaded_at}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        document.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : document.status === "canceled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {document.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {document.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleUpdate(document.id, "approved")}
                          className="text-green-600 hover:text-green-900 mr-2 cursor-pointer"
                        >
                          <BiCheck className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleUpdate(document.id, "canceled")}
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                        >
                          <BiX className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DocumentList;
