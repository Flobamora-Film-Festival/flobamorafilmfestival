// src/components/form/FormAgreementSection.jsx
import React from "react";
import CheckboxField from "./CheckboxField";

const FormAgreementSection = ({
  description,
  checkboxLabel,
  name,
  checked,
  onChange,
  error,
}) => {
  return (
    <div className="mt-6">
      <p className="text-base text-gray-450 mb-2">{description}</p>
      <CheckboxField
        label={checkboxLabel}
        name={name}
        checked={checked}
        onChange={onChange}
        error={error}
      />
    </div>
  );
};

export default FormAgreementSection;
