import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import customerPlanChangesQuery from 'v2/components/Billing/components/PlanChanges/queries/customerPlanChanges'
import groupPlanChangesQuery from 'v2/components/Billing/components/PlanChanges/queries/groupPlanChanges'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'

// TODO: Split out into two parent components or accept a query prop
export default class PlanChanges extends PureComponent {
  static propTypes = {
    entity: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      __typename: PropTypes.oneOf(['Customer', 'Group']),
    }).isRequired,
    plan_id: PropTypes.oneOf(['monthly', 'yearly']).isRequired,
    coupon_code: PropTypes.string,
    quantity: PropTypes.number,
  }

  static defaultProps = {
    coupon_code: null,
    quantity: 0,
  }

  render() {
    const { entity, plan_id, coupon_code, quantity, ...rest } = this.props

    const variables = {
      plan_id: plan_id.toUpperCase(),
      coupon_code,
      quantity,
    }

    if (entity.__typename === 'Group') {
      variables.group_id = entity.id
    }

    return (
      <Box position="relative" {...rest}>
        <Query
          query={
            {
              Customer: customerPlanChangesQuery,
              Group: groupPlanChangesQuery,
            }[entity.__typename]
          }
          variables={variables}
          fetchPolicy="network-only"
        >
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <LoadingIndicator
                  f={2}
                  justifyContent="start"
                  frames={['$', '$$', '$$$']}
                />
              )
            }

            if (error) {
              return <ErrorAlert>{error.message}</ErrorAlert>
            }

            const invoice =
              entity.__typename === 'Group'
                ? data.group.invoice
                : data.me.customer.invoice

            return (
              <Text f={2}>
                {invoice.total >= 0
                  ? `You will be charged $${(invoice.total / 100).toFixed(2)} ${
                      invoice.next_payment_attempt_at
                        ? `on ${invoice.next_payment_attempt_at}`
                        : ''
                    }`
                  : `Your account will be credited $${Math.abs(
                      invoice.total / 100
                    ).toFixed(2)}`}
              </Text>
            )
          }}
        </Query>
      </Box>
    )
  }
}
