import React from 'react';
import './inputField.scss';

const InputField = ({
  type,
  name,
  value,
  onChange,
  onBlur,
  reference,
  formError,
  labelText,
}) => {
  return (
    <div className={`${formError && 'was-validated'}`}>
      <label className='form-label m-2' htmlFor={name}>
        {labelText}
      </label>
      <input
        className='form-control m-2'
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={reference}
      />
      <div className='invalid-feedback mx-2'>{formError}</div>
    </div>
  );
};

export default InputField;
