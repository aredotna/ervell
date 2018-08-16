import React from 'react';
import { storiesOf } from '@storybook/react';

import EmptyConnectTwitter from 'react/pages/feed/EmptyConnectTwitter';

storiesOf('Pages', module)
  .add('Empty feed / Connect twitter', () => (
    <EmptyConnectTwitter />
  ));
