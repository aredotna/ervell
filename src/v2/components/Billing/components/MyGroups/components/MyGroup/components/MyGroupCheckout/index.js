import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import { graphql } from '@apollo/client/react/hoc'

import billingQuery from 'v2/components/Billing/queries/billing'

import myGroupCheckoutFragment from 'v2/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupCheckout/fragments/myGroupCheckout'
import userSelectorFragment from 'v2/components/Billing/components/MyGroups/components/UserSelection/components/UserSelector/fragments/userSelector'

import subscribeToPremiumForUsersMutation from 'v2/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupCheckout/mutations/subscribeToPremiumForUsers'

import Box from 'v2/components/UI/Box'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import Count from 'v2/components/UI/Count'
import GenericButton from 'v2/components/UI/GenericButton'
import { LabelledInput, Label } from 'v2/components/UI/Inputs'
import CouponCode from 'v2/components/Billing/components/CouponCode'
import CreditCard from 'v2/components/Billing/components/CreditCard'
import PlanChanges from 'v2/components/Billing/components/PlanChanges'
import StatusOverlay from 'v2/components/Billing/components/StatusOverlay'

class MyGroupCheckout extends PureComponent {
  static propTypes = {
    me: propType(myGroupCheckoutFragment).isRequired,
    group: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    selectedPlan: PropTypes.oneOf(['basic', 'monthly', 'yearly']).isRequired,
    subscribeToPremiumForUsers: PropTypes.func.isRequired,
    upgradeableUsers: PropTypes.arrayOf(propType(userSelectorFragment))
      .isRequired,
    onSubscribed: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
    coupon_code: '',
  }

  handleCouponCode = coupon_code => this.setState({ coupon_code })

  handleSubmit = e => {
    e.preventDefault()

    this.setState({ mode: 'processing' })

    const {
      me: { customer },
      group: { id: group_id },
      selectedPlan,
      upgradeableUsers,
      subscribeToPremiumForUsers,
      onSubscribed,
      onError,
    } = this.props
    const { coupon_code } = this.state

    const user_ids = upgradeableUsers.map(({ id }) => id)

    return subscribeToPremiumForUsers({
      variables: {
        group_id,
        user_ids,
        token: customer.default_credit_card.id,
        plan_id: selectedPlan.toUpperCase(),
        coupon_code,
      },
      refetchQueries: [{ query: billingQuery }],
      awaitRefetchQueries: true,
    })
      .then(() => {
        this.setState({
          mode: 'resting',
          coupon_code: '',
        })

        return onSubscribed()
      })
      .catch(err => {
        this.setState({ mode: 'resting' })

        return onError(err)
      })
  }

  render() {
    const { mode, coupon_code } = this.state
    const {
      me: { customer },
      group,
      selectedPlan,
      upgradeableUsers,
    } = this.props

    return (
      <Box>
        {mode === 'processing' && (
          <StatusOverlay>
            <LoadingIndicator f={9} />
          </StatusOverlay>
        )}

        {selectedPlan !== 'basic' && (
          <form onSubmit={this.handleSubmit}>
            <LabelledInput>
              <Label>Billed to</Label>

              <CreditCard customer={customer} />
            </LabelledInput>

            <LabelledInput>
              <Label>Coupon</Label>

              <CouponCode
                key={`coupon_${mode}`}
                onDebouncedCode={this.handleCouponCode}
                code={coupon_code}
              />
            </LabelledInput>

            {upgradeableUsers.length > 0 && (
              <LabelledInput>
                <Label />

                <PlanChanges
                  entity={group}
                  plan_id={selectedPlan}
                  coupon_code={coupon_code}
                  quantity={upgradeableUsers.length}
                />
              </LabelledInput>
            )}

            <LabelledInput>
              <Label />

              <div>
                <GenericButton
                  onClick={this.handleSubmit}
                  disabled={
                    upgradeableUsers.length === 0 ||
                    !customer.default_credit_card
                  }
                >
                  {upgradeableUsers.length > 0 ? (
                    <span>
                      Activate{' '}
                      <Count
                        amount={upgradeableUsers.length}
                        label="Premium subscription"
                      />
                    </span>
                  ) : (
                    'Activate'
                  )}
                </GenericButton>
              </div>
            </LabelledInput>
          </form>
        )}
      </Box>
    )
  }
}

export default graphql(subscribeToPremiumForUsersMutation, {
  name: 'subscribeToPremiumForUsers',
})(MyGroupCheckout)
