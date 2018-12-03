import sharify from 'sharify';
import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import {
  StripeProvider,
  Elements,
} from 'react-stripe-elements';

import billingQuery from 'react/components/Billing/queries/billing';

import ErrorAlert from 'react/components/UI/ErrorAlert';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import BillingForm from 'react/components/Billing/components/BillingForm';

const { data: { STRIPE_PUBLISHABLE_KEY } } = sharify;

export default class Billing extends PureComponent {
  render() {
    return (
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
            <StripeProvider apiKey={STRIPE_PUBLISHABLE_KEY}>
              <Elements>
                <BillingForm me={me} />
              </Elements>
            </StripeProvider>
          );
        }}
      </Query>
    );
  }
}
