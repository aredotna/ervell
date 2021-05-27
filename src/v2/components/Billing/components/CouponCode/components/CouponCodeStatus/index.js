import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from '@apollo/client/react/components'

import Text from 'v2/components/UI/Text'

import couponCodeStatusQuery from 'v2/components/Billing/components/CouponCode/components/CouponCodeStatus/queries/couponCodeStatus'

const NBSP = '\xa0'

export default class CouponCodeStatus extends Component {
  static propTypes = {
    code: PropTypes.string,
  }

  static defaultProps = {
    code: null,
  }

  renderCouponStatus = ({ loading, error, data }) => {
    const { code } = this.props

    if (loading || code === null || code === '') return NBSP
    if (error || (data && !data.coupon.is_valid))
      return `‘${code}’ is not a valid coupon`
    if (data) return data.coupon.description

    return NBSP
  }

  render() {
    const { code } = this.props

    return (
      <Query
        query={couponCodeStatusQuery}
        variables={{ code }}
        skip={code === null || code === ''}
        fetchPolicy="network-only"
      >
        {response => {
          const message = this.renderCouponStatus(response)

          return (
            <Text f={1} mt={6}>
              {message}
            </Text>
          )
        }}
      </Query>
    )
  }
}
