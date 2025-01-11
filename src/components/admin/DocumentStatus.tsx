"use client";

import { Document } from "@prisma/client";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

export default function DocumentStatus({
  documents,
}: {
  documents: Document[];
}) {
  const recentDocuments = documents?.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-white p-4 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-semibold mb-4">Recent Document Uploads</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                File
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {recentDocuments?.map((document) => (
              <tr key={document.id} className="border-t border-gray-200">
                <td className="px-4 py-2 whitespace-nowrap">
                  {document.file_url.split("/").pop()}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {document.status === "approved" && (
                    <span className="flex items-center text-green-500">
                      <FaCheckCircle className="mr-1" />
                      Approved
                    </span>
                  )}
                  {document.status === "pending" && (
                    <span className="flex items-center text-yellow-500">
                      <FaClock className="mr-1" />
                      Pending
                    </span>
                  )}
                  {document.status === "canceled" && (
                    <span className="flex items-center text-red-500">
                      <FaTimesCircle className="mr-1" />
                      Rejected
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {new Date(document.uploaded_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
