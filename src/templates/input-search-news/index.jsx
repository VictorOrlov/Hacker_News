import React from 'react';
import PropTypes from 'prop-types';
import s from './input.module.css';

const Input = ({ onChange, value, onKeyPress }) => (
  <div className={s.inputWrapper}>
    <i className={s.fa_search} />
    <input
      className={s.input}
      placeholder="Click to search"
      onChange={onChange}
      onKeyPress={onKeyPress}
      value={value}
    />
  </div>
);

Input.propTypes = {
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  value: PropTypes.string,
}

Input.defaultProps = {
  onChange: () => {},
  onKeyPress: () => {},
  value: ''
}

export default Input;