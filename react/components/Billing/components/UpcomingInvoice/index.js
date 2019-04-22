import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';

import upcomingInvoiceFragment from 'react/components/Billing/components/UpcomingInvoice/fragments/upcomingInvoice';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

export default class UpcomingInvoice extends PureComponent {
  static propTypes = {
    customer: propType(upcomingInvoiceFragment).isRequired,
  }

  render() {
    const { customer: { upcoming_invoice }, ...rest } = this.props;

    if (
      // You don't have an invoice coming up
      !upcoming_invoice ||
      // Or your next invoice is actually a refund
      upcoming_invoice.total <= 0
    ) return null;

    return (
      <Box {...rest}>
        <Text f={2}>
          <React.Fragment>
            Next payment due:{' '}

            {upcoming_invoice.subtotal === upcoming_invoice.total
              ? `$${upcoming_invoice.total / 100.0}`
              : (
                <span>
                  <del>{`$${upcoming_invoice.subtotal / 100.0}`}</del>
                  {` $${upcoming_invoice.total / 100.0}`}
                </span>
              )
            }

            {upcoming_invoice.next_payment_attempt_at &&
              ` on ${upcoming_invoice.next_payment_attempt_at}`
            }
          </React.Fragment>
        </Text>
      </Box>
    );
  }
}
