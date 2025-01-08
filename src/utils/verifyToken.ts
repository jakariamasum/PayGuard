import { envConfig } from "@/envConfig";
import jwt from "jsonwebtoken";

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, envConfig.jwt_secret!);
  } catch (error) {
    console.log("jwt error: ", error);
    return null;
  }
};
