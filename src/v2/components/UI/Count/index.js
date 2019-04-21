import React from 'react';
import PropTypes from 'prop-types';

const Count = ({ amount, label, ...rest }) => (
  <span {...rest}>
    {amount} {amount === 1 ? label : `${label}s`}
  </span>
);

Count.propTypes = {
  amount: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default Count;
