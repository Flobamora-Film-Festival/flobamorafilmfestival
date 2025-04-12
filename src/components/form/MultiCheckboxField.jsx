import React from "react";

const MultiCheckboxField = ({
  label,
  name,
  options,
  selectedValues = [],
  onChange,
  required = false,
  theme = "light",
  error = "",
}) => {
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    let updatedValues = [...selectedValues];
    if (checked) {
      updatedValues.push(value);
    } else {
      updatedValues = updatedValues.filter((v) => v !== value);
    }

    onChange(name, updatedValues);
  };

  const labelClass = "block text-lg font-medium";
  const inputClass = theme === "dark" ? "text-white" : "text-gray-900";

  return (
    <div className="mb-4">
      <label className={labelClass}>{label}</label>
      <div className="space-y-2 mt-2">
        {options.map((opt) => (
          <div key={opt.value} className="flex items-center">
            <input
              type="checkbox"
              id={`${name}_${opt.value}`}
              name={name}
              value={opt.value}
              checked={selectedValues.includes(opt.value)}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor={`${name}_${opt.value}`} className={inputClass}>
              {opt.label}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default MultiCheckboxField;
