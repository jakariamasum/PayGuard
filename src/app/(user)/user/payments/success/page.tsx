"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BiCheckCircle, BiDownload } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";

const PaymentSuccessContent = () => {
  const searchParams = useSearchParams();
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      // Fetch invoice URL
      fetch(`/api/payments/invoice?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => setInvoiceUrl(data.invoiceUrl))
        .catch((err) => console.error("Failed to fetch invoice:", err));
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <BiCheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Payment Successful
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Thank you for your payment. Your transaction has been completed
              successfully.
            </p>
          </div>

          {invoiceUrl && (
            <div className="mt-6">
              <a
                href={invoiceUrl}
                download
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <BiDownload className="mr-2 h-5 w-5" />
                Download Invoice
              </a>
            </div>
          )}

          <div className="mt-6">
            <Link
              href="/user/payments"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <BsArrowLeft className="mr-2 h-5 w-5" />
              Back to Payments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentSuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccessPage;
