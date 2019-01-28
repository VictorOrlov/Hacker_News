import React from 'react';
import PropTypes from 'prop-types';
import s from './select.module.css';

const Input = ({ handleChange, options, value }) => (
  <div className={s.selectWrapper}>
    <select onChange={handleChange} value={value}>
      {options.map(({ value, label }) =>
        <option key={value} value={value}>{label}</option>
      )}
    </select>
    <span className={s.selectText}>per page</span>
  </div>
);

Input.propTypes = {
  handleChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.number,
}

Input.defaultProps = {
  onChange: () => {},
  options: [],
  value: 0,
}

export default Input;