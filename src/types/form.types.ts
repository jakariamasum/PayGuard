import { ReactNode } from "react";
export interface IInput {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder: string;
  icon: ReactNode;
}

export interface IButton {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  onClick?: () => void;
}
