import { envConfig } from "@/envConfig";
import jwt from "jsonwebtoken";

export const generateToken = (user_id: string, role: string) => {
  return jwt.sign({ user_id, role }, envConfig.jwt_secret!, {
    expiresIn: envConfig.jwt_expires!,
  });
};
