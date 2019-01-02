import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';

import billingQuery from 'react/components/Billing/queries/billing';

import Box from 'react/components/UI/Box';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import HorizontalRule from 'react/components/UI/HorizontalRule';
import StripeContext from 'react/components/StripeContext';
import MyHeader from 'react/components/Billing/components/MyHeader';
import BillingForm from 'react/components/Billing/components/BillingForm';
import MyGroups from 'react/components/Billing/components/MyGroups';

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
                <MyHeader me={me} mb={7} />

                <StripeContext>
                  <BillingForm me={me} />
                </StripeContext>

                <HorizontalRule my={10} height="2px" color="gray.light" />

                <MyGroups me={me} />
              </div>
            );
          }}
        </Query>
      </Box>
    );
  }
}
