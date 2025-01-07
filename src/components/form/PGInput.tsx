import { IInput } from "@/types/form.types";
import { useFormContext } from "react-hook-form";

const PGInput = ({
  name,
  label,
  type,
  required = true,
  placeholder,
  icon,
  ...props
}: IInput) => {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-white">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          {...register(name)}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className="block w-full pl-10 pr-3 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent sm:text-sm"
          {...props}
        />
      </div>
    </div>
  );
};

export default PGInput;
