"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user.context";

const DocumentUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { user } = useUser();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        setFile(null);
      } else {
        setError(null);
        setFile(selectedFile);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(0);

    // Simulating file upload with progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setUploadProgress(i);
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", user?.id as string);

    try {
      const response = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        router.push("/user/documents");
      } else {
        const data = await response.json();
        setError(
          data.error || "An error occurred while uploading the document"
        );
      }
    } catch (error) {
      console.error("upload error: ", error);
      setError("An error occurred while uploading the document");
    }
    setIsUploading(false);
    setFile(null);
    // Reset the file input
    const fileInput = document.getElementById("file") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Upload Document</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select a file (max 5MB)
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
          />
          <label
            htmlFor="file"
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer transition duration-150 ease-in-out"
          >
            {file ? file.name : "Choose file"}
          </label>
        </div>
        {error && (
          <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>
        )}
        {file && !error && (
          <p className="text-sm text-gray-500">
            Selected file: <span className="font-semibold">{file.name}</span>
          </p>
        )}
        <button
          type="submit"
          disabled={!file || isUploading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${
            (!file || isUploading) &&
            "opacity-50 cursor-not-allowed hover:bg-indigo-600"
          }`}
        >
          {isUploading ? "Uploading..." : "Upload Document"}
        </button>
      </form>
      {isUploading && (
        <div className="mt-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                  Uploading
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-indigo-600">
                  {uploadProgress}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
              <div
                style={{ width: `${uploadProgress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-300 ease-in-out"
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
