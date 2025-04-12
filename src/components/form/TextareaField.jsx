import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const TextareaField = ({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder = "",
  className = "",
  error = "",
  rows = 6,
  ...rest
}) => {
  const { theme } = useContext(ThemeContext);

  const inputStyle =
    theme === "dark" ? "bg-white text-black" : "bg-white text-gray-900";

  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="block text-lg font-medium">
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md mt-2 ${inputStyle} ${className}`}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextareaField;
