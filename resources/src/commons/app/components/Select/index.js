/* eslint-disable react/prop-types */
import React from 'react';
import './style.scss';

function index({ label, list, filterBy, error, change, ...rest }) {
  return (
    <div className="selectTag">
      {label && <label className="label">{label}</label>}
      {error && <span className="errorMsg">Please Select User</span>}
      <select onChange={change} {...rest} className="select">
        {filterBy && <option>{filterBy}</option>}
        {list.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default index;
