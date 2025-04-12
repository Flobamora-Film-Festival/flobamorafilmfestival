import React from "react";

const CheckboxField = ({
  label,
  name,
  checked,
  onChange,
  required = false,
  error = "",
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="flex items-center space-x-3 cursor-pointer"
      >
        <input
          type="checkbox"
          name={name}
          id={name}
          checked={checked}
          onChange={onChange}
          required={required}
          className="h-5 w-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
        />
        <span className="text-sm text-gray-450">{label}</span>
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CheckboxField;
