import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder = "",
  className = "",
  error = "",
  ...rest
}) => {
  const { theme } = useContext(ThemeContext);

  const inputStyle =
    theme === "dark" ? "bg-white text-black" : "bg-white text-gray-900";

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-lg font-medium">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md mt-2 ${inputStyle} ${className}`}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
