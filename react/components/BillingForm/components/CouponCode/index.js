import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { debounce } from 'underscore';

import Text from 'react/components/UI/Text';
import { Input } from 'react/components/UI/Inputs';

import couponCodeQuery from 'react/components/BillingForm/components/CouponCode/queries/couponCode';

const NBSP = '\xa0';

export default class CouponCode extends Component {
  state = {
    code: null,
  }

  handleChange = ({ target: { value: code } }) =>
    this.debouceCode(code);

  debouceCode = debounce((code) => {
    this.setState({ code });
  }, 250)

  renderCouponStatus = ({ loading, error, data }) => {
    const { code } = this.state;

    if (loading || code === null || code === '') return NBSP;
    if (error) return `‘${code}’ is not a valid coupon`;
    if (data) return data.coupon.description;

    return NBSP;
  }

  render() {
    const { code } = this.state;

    return (
      <Query query={couponCodeQuery} variables={{ code }} skip={code === null}>
        {response => (
          <div>
            <Input placeholder="Coupon code" onChange={this.handleChange} />

            <Text f={1} mt={6}>
              {this.renderCouponStatus(response)}
            </Text>
          </div>
        )}
      </Query>
    );
  }
}
