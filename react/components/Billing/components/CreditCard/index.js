import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import Modal from 'react/components/UI/Modal/Portal';
import MyCreditCard from 'react/components/MyCreditCard';
import DefaultCreditCard from 'react/components/MyCreditCard/components/DefaultCreditCard';

export default class CreditCard extends PureComponent {
  static propTypes = {
    customer: PropTypes.shape({
      default_credit_card: PropTypes.string,
    }).isRequired,
  }

  state = {
    page: 'new',
    mode: 'resting',
  }

  openModal = page => (e) => {
    e.preventDefault();
    this.setState({ page, mode: 'modal' });
  }

  closeModal = (e) => {
    if (e) e.preventDefault();
    this.setState({ mode: 'resting' });
  }

  render() {
    const { mode, page } = this.state;
    const { customer, ...rest } = this.props;

    return (
      <Box {...rest}>
        {customer.default_credit_card
          ? (
            <div>
              <DefaultCreditCard default_credit_card={customer.default_credit_card} />

              <Text pt={5} f={2} fontWeight="bold">
                <a onClick={this.openModal('manage')} role="button" tabIndex={0}>
                  Manage payment information
                </a>
              </Text>
            </div>
          )
          : (
            <Text pt={5} f={2} fontWeight="bold">
              <a onClick={this.openModal('new')} role="button" tabIndex={0}>
                + Add credit card
              </a>
            </Text>
          )
        }

        {mode === 'modal' &&
          <Modal onClose={this.closeModal}>
            <MyCreditCard page={page} onDone={this.closeModal} />
          </Modal>
        }
      </Box>
    );
  }
}
