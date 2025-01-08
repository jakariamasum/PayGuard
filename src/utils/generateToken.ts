import { envConfig } from "@/envConfig";
import jwt from "jsonwebtoken";

export const generateToken = (user_id: string) => {
  return jwt.sign({ user_id }, envConfig.jwt_secret!, {
    expiresIn: envConfig.jwt_expires!,
  });
};
