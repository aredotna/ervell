import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import planChangesQuery from 'react/components/Billing/components/PlanChanges/queries/planChanges';

import Text from 'react/components/UI/Text';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';

export default class PlanChanges extends PureComponent {
  static propTypes = {
    plan_id: PropTypes.oneOf(['monthly', 'yearly']).isRequired,
    coupon_code: PropTypes.string,
  }

  static defaultProps = {
    coupon_code: null,
  }

  render() {
    const { plan_id, coupon_code } = this.props;

    return (
      <Query query={planChangesQuery} variables={{ plan_id, coupon_code }} fetchPolicy="network-only">
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingIndicator f={2} frames={['$', '$$', '$$$']} justifyContent="start" />;
          }

          if (error) {
            return (
              <ErrorAlert>
                {error.message}
              </ErrorAlert>
            );
          }

          const { me: { customer: { upcoming_invoice } } } = data;

          return (
            <Text f={2}>
              {upcoming_invoice.total >= 0
                ? `You will be charged $${(upcoming_invoice.total / 100).toFixed(2)}`
                : `Your account will be credited $${Math.abs(upcoming_invoice.total / 100).toFixed(2)}`
              }
            </Text>
          );
        }}
      </Query>
    );
  }
}
