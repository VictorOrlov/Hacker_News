import React from 'react';
import PropTypes from 'prop-types';
import s from './title.module.css';

const Title = ({ title }) => {
  return(
      <h3 className={s.title}>{title}</h3>
  );
}

Title.propTypes = {
  title: PropTypes.string,
}
Title.defaultProps = {
  title: 'Simple title'
}

export default Title;