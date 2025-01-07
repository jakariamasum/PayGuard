import { ReactNode } from "react";
export interface IInput {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder: string;
}

export interface IButton {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
}
