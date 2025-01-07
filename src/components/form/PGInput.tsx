import { IInput } from "@/types/form.types";
import { useFormContext } from "react-hook-form";

const PGInput = ({
  name,
  label,
  type,
  required = true,
  placeholder,
  ...props
}: IInput) => {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col black py-2">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        {...register(name)}
        type={type}
        id={name}
        placeholder={placeholder}
        className="rounded-lg text-black bg-gray-300 mt-2 p-2  focus:bg-gray-100 focus:outline-none"
        required={required}
        {...props}
      />
    </div>
  );
};

export default PGInput;
