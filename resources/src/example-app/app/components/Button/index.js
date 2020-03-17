import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, ...rest }) {
  return (
    <button type="button" {...rest}>
      {' '}
      {children}
      {' '}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
};

export default Button;
