import { IButton } from "@/types/form.types";

const Button = ({
  children,
  variant = "primary",
  disabled = false,
  ...props
}: IButton) => {
  const baseClasses =
    "px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary:
      "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
