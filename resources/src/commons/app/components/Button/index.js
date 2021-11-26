/* eslint-disable react/prop-types */
import React from 'react';
import './style.scss';

function index({ value, ...rest }) {
  return (
    <div className="buttonTag">
      <button type="submit" {...rest}>
        {value}
      </button>
    </div>
  );
}

export default index;
