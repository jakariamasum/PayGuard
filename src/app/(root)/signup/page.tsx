"use client";

import { motion } from "framer-motion";
import PGForm from "@/components/form/PGForm";
import PGInput from "@/components/form/PGInput";
import EmailIcon from "@/components/icons/EmailIcon";
import LockIcon from "@/components/icons/LockIcon";
import Button from "@/components/UI/Button";
import { FieldValues } from "react-hook-form";
import Link from "next/link";
import { handleSignup } from "@/services/authServices";
import { toast } from "sonner";
import { useState } from "react";
import LoadingIcon from "@/components/icons/LoadingIcon";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: FieldValues) => {
    // Check if password and confirm password match
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Proceed with signup

    setLoading(true);
    try {
      const res = await handleSignup(data.email, data.password);

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Signup successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      console.log("signup error: ", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center  p-4">
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
            <h2 className="text-3xl font-bold text-black text-center mb-6">
              Welcome Back!
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
                <PGInput
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="******"
                  icon={<LockIcon />}
                />
                <Button disabled={loading}>
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <LoadingIcon />
                      <span>Signing Up...</span>
                    </div>
                  ) : (
                    "Signup"
                  )}
                </Button>{" "}
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
              Already have an account?
              <Link
                href={"/login"}
                className="font-medium text-indigo-200 hover:text-green-200 ml-1 focus:outline-none focus:underline transition-colors duration-300"
              >
                Log in
              </Link>
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
