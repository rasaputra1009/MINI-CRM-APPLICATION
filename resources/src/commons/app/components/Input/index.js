/* eslint-disable react/prop-types */
import React from 'react';
import './style.scss';

function index({ label, type, placeholder, disabled, value, change, error }) {
  return (
    <div className="inputTags">
      {label && (
        <label htmlFor="name" className="label">
          {label}
        </label>
      )}
      {error && (
        <span className="errorMsg">Please {placeholder} Correctly</span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={change}
        disabled={disabled}
        className="inputTag"
        required
      />
    </div>
  );
}

export default index;
