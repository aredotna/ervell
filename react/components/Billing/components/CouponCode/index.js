import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'underscore';

import { Input } from 'react/components/UI/Inputs';
import CouponCodeStatus from 'react/components/Billing/components/CouponCode/components/CouponCodeStatus';

export default class CouponCode extends PureComponent {
  static propTypes = {
    code: PropTypes.string,
    onValidCoupon: PropTypes.func,
    onDebouncedCode: PropTypes.func,
  }

  static defaultProps = {
    code: '',
    onValidCoupon: () => {},
    onDebouncedCode: () => {},
  }

  state = {
    code: this.props.code,
  }

  handleChange = ({ target: { value: code } }) =>
    this.debounceCode(code);

  debounceCode = debounce((code) => {
    this.setState({ code });
    this.props.onDebouncedCode(code);
  }, 250)

  render() {
    const { code } = this.state;

    return (
      <div>
        <Input placeholder="Coupon code" onChange={this.handleChange} defaultValue={code} />

        <CouponCodeStatus code={code} onValidCoupon={this.props.onValidCoupon} />
      </div>
    );
  }
}
