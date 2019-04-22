import React, { PureComponent } from 'react';

import Alert from 'v2/components/UI/Alert';
import Box from 'v2/components/UI/Box';
import { SpaceProps } from 'styled-system';
import { CancellationNotice as CancellationNoticeType } from '__generated__/CancellationNotice';

interface CancellationNoticeProps extends SpaceProps {
  customer: CancellationNoticeType;
  onReenable: any;
}

export default class CancellationNotice extends PureComponent<
  CancellationNoticeProps
> {
  render() {
    const {
      onReenable,
      customer: { current_period_end_at },
      ...rest
    } = this.props;

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
