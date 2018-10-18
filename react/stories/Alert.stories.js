import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Specimen from 'react/stories/__components__/Specimen';
import Alert from 'react/components/UI/Alert';

storiesOf('Alert', module)
  .add('default', () => (
    <Specimen>
      <Alert mb={6} onClose={action('onClose')}>
        A group is a shared account that many people can use to collaborate on Are.na.
        You can also create a secret group to separate channels from your personal profile.
      </Alert>

      <Alert mb={6} bg="white" onClose={action('onClose')}>
        A group is a shared account that many people can use to collaborate on Are.na.
        You can also create a secret group to separate channels from your personal profile.
      </Alert>

      <Alert mb={6} bg="state.alert" color="white" onClose={action('onClose')}>
        Something went wrong! Try again.
      </Alert>

      <Alert bg="black" color="white" isCloseable={false}>
        Just wanted to say hey.
      </Alert>
    </Specimen>
  ));
