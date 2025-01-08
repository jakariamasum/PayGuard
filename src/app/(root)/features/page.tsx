"use client";

import { motion } from "framer-motion";
import { BiBarChart, BiCreditCard, BiGlobe, BiLock } from "react-icons/bi";
import { BsClock, BsShieldCheck } from "react-icons/bs";
import { FaUserSecret } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";

const Features = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const features = [
    {
      icon: <BsShieldCheck className="w-12 h-12 text-indigo-500" />,
      title: "Secure Payments",
      description:
        "Advanced encryption and security measures to protect your transactions.",
    },
    {
      icon: <BiCreditCard className="w-12 h-12 text-indigo-500" />,
      title: "Multiple Payment Options",
      description: "Support for various payment methods to suit your needs.",
    },
    {
      icon: <FiFileText className="w-12 h-12 text-indigo-500" />,
      title: "Document Verification",
      description: "Easy upload and verification of important documents.",
    },
    {
      icon: <FaUserSecret className="w-12 h-12 text-indigo-500" />,
      title: "User Management",
      description: "Efficiently manage user accounts and permissions.",
    },
    {
      icon: <BiBarChart className="w-12 h-12 text-indigo-500" />,
      title: "Analytics Dashboard",
      description: "Comprehensive insights into your payment activities.",
    },
    {
      icon: <BiLock className="w-12 h-12 text-indigo-500" />,
      title: "Fraud Protection",
      description:
        "Advanced algorithms to detect and prevent fraudulent activities.",
    },
    {
      icon: <BiGlobe className="w-12 h-12 text-indigo-500" />,
      title: "Global Payments",
      description: "Send and receive payments internationally with ease.",
    },
    {
      icon: <BsClock className="w-12 h-12 text-indigo-500" />,
      title: "Real-time Notifications",
      description:
        "Instant alerts for all account activities and transactions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-20">
        <div className="container mx-auto px-6">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-8 text-center text-indigo-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            PayGuard Features
          </motion.h1>
          <motion.p
            className="text-xl mb-12 text-center text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover the powerful features that make PayGuard the leading choice
            for secure payment management and verification.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md"
                {...fadeIn}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold ml-4 text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2023 PayGuard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Features;
