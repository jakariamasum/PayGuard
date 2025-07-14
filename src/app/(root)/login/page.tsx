"use client";

import { motion } from "framer-motion";
import PGForm from "@/components/form/PGForm";
import PGInput from "@/components/form/PGInput";
import EmailIcon from "@/components/icons/EmailIcon";
import LockIcon from "@/components/icons/LockIcon";
import Button from "@/components/UI/Button";
import { FieldValues } from "react-hook-form";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { handleLogin } from "@/services/authServices";
import LoadingIcon from "@/components/icons/LoadingIcon";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    try {
      const res = await handleLogin(data.email, data.password);

      if (!res) {
        toast.error(res.error);
      } else {
        toast.success("Login successful! Redirecting...");
        window.location.href = res;
      }
    } catch (error) {
      console.error("login error: ", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="bg-white text-black backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
          whileHover={{ scale: 1.03 }}
        >
          <div className="px-8 pt-10 pb-8">
            <h2 className="text-3xl font-bold  text-center mb-6">
              Welcome Back 👋
            </h2>
            <PGForm onSubmit={onSubmit}>
              <div className="space-y-5">
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
                  placeholder="••••••••"
                  icon={<LockIcon />}
                />
                <Button disabled={loading}>
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <LoadingIcon />
                      <span>Logging in...</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </PGForm>
          </div>
          <div className="px-8 py-6 bg-white/5 border-t border-white/10 text-center">
            <motion.p
              className="text-sm "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Don’t have an account?
              <Link
                href="/signup"
                className="ml-1 font-medium  hover:text-indigo-500 underline transition duration-300"
              >
                Sign up
              </Link>
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
