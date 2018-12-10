import sharify from 'sharify';
import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import {
  StripeProvider,
  Elements,
} from 'react-stripe-elements';

import billingQuery from 'react/components/Billing/queries/billing';

import Box from 'react/components/UI/Box';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import HorizontalRule from 'react/components/UI/HorizontalRule';
import BillingForm from 'react/components/Billing/components/BillingForm';
import MyGroups from 'react/components/Billing/components/MyGroups';

const { data: { STRIPE_PUBLISHABLE_KEY } } = sharify;

export default class Billing extends PureComponent {
  render() {
    return (
      <Box width={['100%', '75%', '50%']} mx="auto" mt={6} mb={8} position="relative">
        <Query query={billingQuery}>
          {({ loading, error, data }) => {
            if (loading) {
              return <LoadingIndicator my={9} />;
            }

            if (error) {
              return (
                <ErrorAlert>
                  {error.message}
                </ErrorAlert>
              );
            }

            const { me } = data;

            return (
              <div>
                <StripeProvider apiKey={STRIPE_PUBLISHABLE_KEY}>
                  <Elements>
                    <BillingForm me={me} />
                  </Elements>
                </StripeProvider>

                <HorizontalRule />

                <MyGroups me={me} />
              </div>
            );
          }}
        </Query>
      </Box>
    );
  }
}
