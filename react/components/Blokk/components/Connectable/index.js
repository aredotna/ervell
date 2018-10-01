import React, { Component } from 'react';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

export default class Connectable extends Component {
  render() {
    return (
      <Box height="100%" style={{ overflow: 'hidden' }}>
        <Text font="mono">
          <pre>{JSON.stringify(this.props, null, 2)}</pre>
        </Text>
      </Box>
    );
  }
}
