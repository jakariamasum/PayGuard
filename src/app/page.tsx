"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { BsArrowRight, BsShieldCheck } from "react-icons/bs";
import { BiBarChart, BiCreditCard, BiLock } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import Footer from "@/components/Footer";

const Home = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const features = [
    {
      icon: <BsShieldCheck className="w-6 h-6 text-indigo-500" />,
      title: "Secure Payments",
      description:
        "Advanced encryption and security measures to protect your transactions.",
    },
    {
      icon: <BiCreditCard className="w-6 h-6 text-indigo-500" />,
      title: "Multiple Payment Options",
      description: "Support for various payment methods to suit your needs.",
    },
    {
      icon: <FiFileText className="w-6 h-6 text-indigo-500" />,
      title: "Document Verification",
      description: "Easy upload and verification of important documents.",
    },
  ];

  const stats = [
    { number: "99.9%", label: "Uptime" },
    { number: "50K+", label: "Users" },
    { number: "$1M+", label: "Transactions" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 text-gray-900"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Welcome to PayGuard
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-12 text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Secure Payment Tracking and Verification System
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="/signup"
                className="bg-indigo-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
              >
                Get Started
                <BsArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="#features"
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-md font-semibold hover:bg-gray-300 transition duration-300 flex items-center justify-center"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-100">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900"
              {...fadeIn}
            >
              Why Choose PayGuard?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md"
                  {...fadeIn}
                  transition={{ delay: 0.2 * (index + 1) }}
                >
                  {feature.icon}
                  <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-indigo-600 text-white">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              {...fadeIn}
            >
              Trusted by Businesses Worldwide
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  {...fadeIn}
                  transition={{ delay: 0.2 * (index + 1) }}
                >
                  <p className="text-4xl font-bold mb-2">{stat.number}</p>
                  <p className="text-xl">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900"
              {...fadeIn}
            >
              How It Works
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div
                className="text-center"
                {...fadeIn}
                transition={{ delay: 0.2 }}
              >
                <FaUsers className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  1. Create Account
                </h3>
                <p className="text-gray-600">
                  Sign up and verify your identity
                </p>
              </motion.div>
              <motion.div
                className="text-center"
                {...fadeIn}
                transition={{ delay: 0.4 }}
              >
                <BiCreditCard className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  2. Add Payment Method
                </h3>
                <p className="text-gray-600">
                  Connect your preferred payment options
                </p>
              </motion.div>
              <motion.div
                className="text-center"
                {...fadeIn}
                transition={{ delay: 0.6 }}
              >
                <BiLock className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  3. Secure Transactions
                </h3>
                <p className="text-gray-600">
                  Make and receive payments securely
                </p>
              </motion.div>
              <motion.div
                className="text-center"
                {...fadeIn}
                transition={{ delay: 0.8 }}
              >
                <BiBarChart className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  4. Track & Manage
                </h3>
                <p className="text-gray-600">
                  Monitor your transactions and documents
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-6 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-8 text-gray-900"
              {...fadeIn}
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p
              className="text-xl mb-12 text-gray-600"
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              Join thousands of users who trust PayGuard for their payment
              needs.
            </motion.p>
            <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
              <Link
                href="/signup"
                className="bg-indigo-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-indigo-700 transition duration-300 inline-flex items-center"
              >
                Create Your Account
                <BsArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
