import React, { Component } from 'react';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import GenericButton from 'react/components/UI/GenericButton';
import { LabelledInput, Label } from 'react/components/UI/Inputs';
import PlanSelection from 'react/components/BillingForm/components/PlanSelection';
import CreditCard from 'react/components/BillingForm/components/CreditCard';
import CouponCode from 'react/components/BillingForm/components/CouponCode';

export default class BillingForm extends Component {
  handlePlan = (plan_id) => {
    console.log({ plan_id });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('[submit]', e);
  }

  render() {
    return (
      <Box width="50%">
        <form onSubmit={this.handleSubmit}>
          <PlanSelection onSelect={this.handlePlan} />

          <LabelledInput>
            <Label>
              Billed to
            </Label>

            <CreditCard />
          </LabelledInput>

          <LabelledInput>
            <Label>
              Coupon
            </Label>

            <CouponCode />
          </LabelledInput>

          <LabelledInput>
            <Label />

            <div>
              <GenericButton>
                Activate
              </GenericButton>

              <Text f={2} mt={6} underlineLinks>
                <a href="#">
                  Cancel
                </a>
              </Text>
            </div>
          </LabelledInput>
        </form>
      </Box>
    );
  }
}
