import React from 'react';
import { propType } from 'graphql-anywhere';

import defaultCreditCardFragment from 'react/components/MyCreditCard/components/DefaultCreditCard/fragments/defaultCreditCard';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

const DefaultCreditCard = ({ default_credit_card, ...rest }) => (
  <Box bg="gray.hint" p={6} borderRadius="0.25em" {...rest}>
    <Text>
      {default_credit_card.brand.toUpperCase()} **{default_credit_card.last4}
      {' — '}
      {default_credit_card.exp_month}/{default_credit_card.exp_year}
    </Text>
  </Box>
);

DefaultCreditCard.propTypes = {
  default_credit_card: propType(defaultCreditCardFragment).isRequired,
};

export default DefaultCreditCard;
