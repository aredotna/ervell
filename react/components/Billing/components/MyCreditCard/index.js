import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import myCreditCardFragment from 'react/components/Billing/components/MyCreditCard/fragments/myCreditCard';

import Text from 'react/components/UI/Text';
import Box from 'react/components/UI/Box';
import NewCreditCardForm from 'react/components/Billing/components/NewCreditCardForm';
import ManageMyCreditCards from 'react/components/Billing/components/MyCreditCard/components/ManageMyCreditCards';

export default class MyCreditCard extends Component {
  static propTypes = {
    customer: propType(myCreditCardFragment).isRequired,
    onNewCreditCardReady: PropTypes.func,
    onChangeDefaultCreditCard: PropTypes.func,
  }

  static defaultProps = {
    onNewCreditCardReady: () => {},
    onChangeDefaultCreditCard: () => {},
  }

  state = {
    mode: 'default',
  }

  setMode = mode => (e) => {
    e.preventDefault();
    this.setState({ mode });
  }

  render() {
    const { mode } = this.state;
    const {
      customer,
      customer: {
        plan,
        upcoming_invoice,
        subscription,
        credit_cards,
        default_credit_card,
      },
      onNewCreditCardReady,
      onChangeDefaultCreditCard,
    } = this.props;

    const visibleMode = default_credit_card ? mode : 'new';

    return (
      <Box>
        {visibleMode === 'default' &&
          <Box bg="gray.hint" p={6} mb={6}>
            <Text>
              {default_credit_card.brand.toUpperCase()} **{default_credit_card.last4}
              {' — '}
              {default_credit_card.exp_month}/{default_credit_card.exp_year}
            </Text>
          </Box>
        }

        {visibleMode === 'new' &&
          <NewCreditCardForm onReady={onNewCreditCardReady} />
        }

        {visibleMode === 'manage' &&
          <ManageMyCreditCards
            customer={customer}
            onChangeDefaultCreditCard={onChangeDefaultCreditCard}
          />
        }

        {visibleMode !== 'new' &&
          <Text f={1} my={6} px={6} fontWeight="bold">
            <a onClick={this.setMode('new')} role="button" tabIndex={0}>
              + Add new card
            </a>
          </Text>
        }

        {visibleMode === 'default' &&
          <Box my={6} px={6}>
            {subscription &&
              <Text f={1} mb={6}>
                {!subscription.is_canceled &&
                  <div>
                    Currently billing
                    {' '}

                    {upcoming_invoice.subtotal === upcoming_invoice.total
                      ? `$${upcoming_invoice.total / 100.0}`
                      : (
                        <span>
                          <del>{`$${upcoming_invoice.subtotal / 100.0}`}</del>
                          {` $${upcoming_invoice.total / 100.0}`}
                        </span>
                      )
                    }

                    {' / '}
                    {{ monthly: 'month', yearly: 'year' }[plan.term]}
                  </div>
                }

                {subscription.is_canceled
                  ? `Your plan will end on ${subscription.current_period_end_at}`
                  : `Automatically renews on ${upcoming_invoice.next_payment_attempt_at}`
                }
                <br />
              </Text>
            }

            {credit_cards.length > 1 &&
              <Text f={1} underlineLinks>
                <a onClick={this.setMode('manage')} role="button" tabIndex={0}>
                  Manage cards
                </a>
              </Text>
            }
          </Box>
        }
      </Box>
    );
  }
}
