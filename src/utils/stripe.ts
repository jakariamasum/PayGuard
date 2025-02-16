import { envConfig } from "@/envConfig";
import Stripe from "stripe";

export const stripe = new Stripe(envConfig.stripe_secret_key!, {
  apiVersion: "2024-12-18.acacia",
});
