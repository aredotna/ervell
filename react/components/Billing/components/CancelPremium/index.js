import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import GenericButton from 'react/components/UI/GenericButton';

export default class CancelPremium extends PureComponent {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  activateConfirmation = (e) => {
    e.preventDefault();
    this.setState({ mode: 'active' });
  }

  cancelCancellation = (e) => {
    e.preventDefault();
    this.setState({ mode: 'resting' });
  }

  render() {
    const { mode } = this.state;
    const { onCancel } = this.props;

    return (
      <Box {...this.props}>
        {mode === 'resting' &&
          <Text f={2} underlineLinks>
            <a onClick={this.activateConfirmation} role="button" tabIndex={0}>
              Cancel premium
            </a>
          </Text>
        }

        {mode !== 'resting' &&
          <div>
            <Text f={2} mb={4} color="state.alert">
              Are you sure?
            </Text>

            <GenericButton
              f={2}
              color="state.alert"
              onClick={onCancel}
              disabled={mode === 'cancelling'}
            >
              {{
                active: 'Yes, cancel Premium',
                cancelling: 'Cancelling...',
                error: 'Error',
                refreshing: 'Wait',
              }[mode]}
            </GenericButton>

            {' '}

            {mode !== 'cancelling' &&
              <GenericButton
                f={2}
                color="state.alert"
                onClick={this.cancelCancellation}
              >
                No
              </GenericButton>
            }
          </div>
        }
      </Box>
    );
  }
}
