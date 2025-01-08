import { getUserDocuments } from "@/services/documentServices";
import { IDocument } from "@/types/document.types";
import Link from "next/link";
import { BiCheckCircle } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { FiAlertCircle, FiFileText } from "react-icons/fi";
export const dynamic = "force-dynamic";

const Documents = async () => {
  const documents: IDocument[] = await getUserDocuments(
    "30a7e57c-7b28-42d9-a8c4-3eef1d5b106f"
  );
  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-end m-2">
        <Link
          href="/dashboard/documents/upload"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          <FiFileText className="mr-2 h-5 w-5" />
          Upload Document
        </Link>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {documents.map((document) => (
            <li
              key={document.id}
              className="hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FiFileText className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-indigo-600 hover:text-indigo-800 truncate">
                        <Link
                          href={document.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {document?.file_url?.split("/")?.pop()}
                        </Link>
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        User ID: {document.user_id}
                      </p>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        document.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {document.status === "approved" ? (
                        <BiCheckCircle className="mr-1 h-4 w-4" />
                      ) : (
                        <FiAlertCircle className="mr-1 h-4 w-4" />
                      )}
                      {document.status}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <BsClock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      Uploaded on{" "}
                      {new Date(document.uploaded_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Documents;
