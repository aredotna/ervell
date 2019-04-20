import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import cancellationNoticeFragment from 'v2/components/Billing/components/CancellationNotice/fragments/cancellationNotice';

import Alert from 'v2/components/UI/Alert';
import Box from 'v2/components/UI/Box';

export default class CancellationNotice extends PureComponent {
  static propTypes = {
    onReenable: PropTypes.func.isRequired,
    customer: propType(cancellationNoticeFragment).isRequired,
  }

  render() {
    const { onReenable, customer: { current_period_end_at }, ...rest } = this.props;

    return (
      <Alert isCloseable={false} {...rest}>
        <Box display="flex" justifyContent="space-between">
          Your Premium membership will end on {current_period_end_at}

          <Box ml={4}>
            <a onClick={onReenable} role="button" tabIndex={0}>
              Re-enable premium
            </a>
          </Box>
        </Box>
      </Alert>
    );
  }
}
