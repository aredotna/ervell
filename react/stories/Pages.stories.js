import React from 'react';
import { storiesOf } from '@storybook/react';

import EmptyConnectTwitter from 'react/pages/feed/EmptyConnectTwitter';
import NoFollowerMessage from 'react/pages/feed/NoFollowerMessage';

storiesOf('Pages', module)
  .add('Empty feed / Connect twitter', () => (
    <EmptyConnectTwitter />
  ))
  .add('Empty feed / No follower message', () => (
    <NoFollowerMessage />
  ));
