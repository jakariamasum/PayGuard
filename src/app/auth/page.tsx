"use client";

import { motion } from "framer-motion";
import PGForm from "@/components/form/PGForm";
import PGInput from "@/components/form/PGInput";
import EmailIcon from "@/components/icons/EmailIcon";
import LockIcon from "@/components/icons/LockIcon";
import Button from "@/components/UI/Button";
import { useState } from "react";
import { FieldValues } from "react-hook-form";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const onSubmit = (data: FieldValues) => {
    console.log("form data: ", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500"
          whileHover={{ scale: 1.1 }}
        >
          <div className="px-8 pt-8 pb-8">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
              {isLogin ? "Welcome Back!" : "Create Your Account"}
            </h2>
            <PGForm onSubmit={onSubmit}>
              <div className="space-y-4">
                <PGInput
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="john@example.com"
                  icon={<EmailIcon />}
                />
                <PGInput
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="******"
                  icon={<LockIcon />}
                />
                <Button>{isLogin ? "Login" : "Sign Up"}</Button>
              </div>
            </PGForm>
          </div>
          <div className="px-8 py-6 bg-white bg-opacity-10 border-t border-white border-opacity-20">
            <motion.p
              className="text-sm text-center text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-indigo-200 hover:text-green-200 ml-1 focus:outline-none focus:underline transition-colors duration-300"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
