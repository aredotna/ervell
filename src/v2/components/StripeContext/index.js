import sharify from 'sharify';
import React from 'react';
import PropTypes from 'prop-types';
import { StripeProvider, Elements } from 'react-stripe-elements';

const { data: { STRIPE_PUBLISHABLE_KEY } } = sharify;

const StripeContext = ({ children }) => (
  <StripeProvider apiKey={STRIPE_PUBLISHABLE_KEY}>
    <Elements>
      {children}
    </Elements>
  </StripeProvider>
);

StripeContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StripeContext;
