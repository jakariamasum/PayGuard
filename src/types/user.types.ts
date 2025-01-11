import { Document, Payment } from "@prisma/client";

export interface User {
  id: string;
  email: string;
}

export interface IUserData {
  email: string;
  role: string;
  payments: Payment[];
  documents: Document[];
}
