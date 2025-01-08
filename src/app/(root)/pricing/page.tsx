"use client";

import { motion } from "framer-motion";
import { BiCheck } from "react-icons/bi";

const Pricing = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const plans = [
    {
      name: "Basic",
      price: "$29",
      features: [
        "Up to 1,000 transactions per month",
        "Basic document verification",
        "Email support",
        "2 team members",
      ],
    },
    {
      name: "Pro",
      price: "$99",
      features: [
        "Up to 10,000 transactions per month",
        "Advanced document verification",
        "Priority email and chat support",
        "5 team members",
        "Analytics dashboard",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited transactions",
        "Advanced document verification with AI",
        "24/7 phone, email, and chat support",
        "Unlimited team members",
        "Custom analytics and reporting",
        "Dedicated account manager",
      ],
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
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            className="text-xl mb-12 text-center text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Choose the plan that best fits your business needs. All plans come
            with our core features, including secure payments and user
            management.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-8 shadow-md flex flex-col"
                {...fadeIn}
                transition={{ delay: 0.2 * (index + 1) }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                  {plan.name}
                </h3>
                <p className="text-4xl font-bold mb-6 text-indigo-600">
                  {plan.price}
                  <span className="text-sm font-normal text-gray-600">
                    {plan.name !== "Enterprise" ? "/month" : ""}
                  </span>
                </p>
                <ul className="mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center mb-2">
                      <BiCheck className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition duration-300">
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </button>
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

export default Pricing;
