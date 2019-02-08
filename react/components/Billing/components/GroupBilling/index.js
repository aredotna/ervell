import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';

import groupBillingQuery from 'react/components/Billing/queries/groupBilling';

import Box from 'react/components/UI/Box';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import MyGroups from 'react/components/Billing/components/MyGroups';

export default class GroupBilling extends PureComponent {
  render() {
    return (
      <Box width={['100%', '75%', '50%']} mx="auto" mt={6} mb={8} position="relative">
        <Query query={groupBillingQuery}>
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
                <MyGroups me={me} />
              </div>
            );
          }}
        </Query>
      </Box>
    );
  }
}
