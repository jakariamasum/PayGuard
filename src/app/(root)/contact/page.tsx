"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BsMailbox } from "react-icons/bs";
import { BiMapPin, BiPhone } from "react-icons/bi";
import PGForm from "@/components/form/PGForm";
import Button from "@/components/UI/Button";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setMessage("");
  };

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
            Contact Us
          </motion.h1>
          <motion.p
            className="text-xl mb-12 text-center text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Have questions or need assistance? We&lsquo;re here to help. Reach
            out to our team using the form below or through our contact
            information.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="bg-white rounded-lg p-8 shadow-md"
              {...fadeIn}
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                Send us a message
              </h2>
              <PGForm onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <Button>Send Message</Button>
              </PGForm>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg p-8 shadow-md"
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <BsMailbox className="w-6 h-6 text-indigo-500 mr-4" />
                  <span className="text-gray-600">support@payguard.com</span>
                </div>
                <div className="flex items-center">
                  <BiPhone className="w-6 h-6 text-indigo-500 mr-4" />
                  <span className="text-gray-600">+880 123-4567</span>
                </div>
                <div className="flex items-center">
                  <BiMapPin className="w-6 h-6 text-indigo-500 mr-4" />
                  <span className="text-gray-600">
                    123 Payment Street, Secure City, Bangladesh
                  </span>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Business Hours
                </h3>
                <p className="text-gray-600">
                  Sunday - Friday: 9:00 AM - 6:00 PM
                </p>
                <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-600">Friday: Closed</p>
              </div>
            </motion.div>
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

export default Contact;
