import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  className = "",
  error = "",
  placeholder = "",
  ...rest
}) => {
  const { theme } = useContext(ThemeContext); // Ambil dari context

  const baseClass =
    theme === "dark" ? "bg-white text-black" : "bg-white text-gray-900";

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-lg font-medium">
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md mt-2 ${baseClass} ${className}`}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SelectField;
