import React, { Component } from 'react';

import Text from 'react/components/UI/Text';
import Box from 'react/components/UI/Box';
import HorizontalRule from 'react/components/UI/HorizontalRule';
import Billing from 'react/components/Billing';


export default class BillingPage extends Component {
  redirectToOnboarding = () => {
    window.location = '/welcome';
  }

  render() {
    return (
      <Box>

        <Box width={['100%', '75%', '75%']} mx="auto" mb={8}>
          <Text pt={8} pb={2} f={4} display="flex" flexDirection="column" justifyContent="space-between">
            <strong>Select your plan</strong>
            <a href="/welcome">Skip</a>
          </Text>
          <HorizontalRule />
        </Box>

        <Billing
          plan_id="yearly"
          onSuccess={this.redirectToOnboarding}
        />
      </Box>
    );
  }
}
