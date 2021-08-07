import React from 'react';
import './inputField.scss';

const InputField = ({
  type,
  name,
  value,
  onChange,
  onBlur,
  reference,
  error,
  labelText,
  placeholder,
  centerClass,
}) => {
  return (
    <div className={`${error && 'was-validated'}`}>
      <label className={`form-label m-2 ${centerClass}`} htmlFor={name}>
        {labelText}
      </label>
      <input
        placeholder={placeholder}
        className={`form-control m-2 ${centerClass}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={reference}
      />
      <div className={`invalid-feedback mx-2 ${centerClass}`}>{error}</div>
    </div>
  );
};

export default InputField;
