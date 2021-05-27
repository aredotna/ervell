import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Query } from '@apollo/client/react/components'

import billingQuery from 'v2/components/Billing/queries/billing'

import Box from 'v2/components/UI/Box'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import StripeContext from 'v2/components/StripeContext'
import MyHeader from 'v2/components/Billing/components/MyHeader'
import BillingForm from 'v2/components/Billing/components/BillingForm'

export default class Billing extends PureComponent {
  static propTypes = {
    plan_id: PropTypes.string,
    onSuccess: PropTypes.func,
  }

  static defaultProps = {
    plan_id: null,
    onSuccess: () => null,
  }
  render() {
    const { plan_id, onSuccess } = this.props

    return (
      <Box
        width={['100%', '75%', '75%']}
        mx="auto"
        mt={6}
        mb={8}
        position="relative"
      >
        <Query query={billingQuery} ssr={false}>
          {({ loading, error, data }) => {
            if (loading) {
              return <LoadingIndicator my={9} />
            }

            if (error) {
              return <ErrorAlert>{error.message}</ErrorAlert>
            }

            const { me } = data

            return (
              <React.Fragment>
                <MyHeader me={me} mb={7} />

                <StripeContext>
                  <BillingForm
                    me={me}
                    plan_id={plan_id}
                    onSuccess={onSuccess}
                  />
                </StripeContext>
              </React.Fragment>
            )
          }}
        </Query>
      </Box>
    )
  }
}
