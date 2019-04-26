import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Specimen from 'v2/stories/__components__/Specimen'
import Alert from 'v2/components/UI/Alert'

storiesOf('Alert', module).add('default', () => (
  <Specimen>
    <Alert mb={6} onClose={action('onClose')}>
      A group is a shared account that many people can use to collaborate on
      Are.na. You can also create a secret group to separate channels from your
      personal profile.
    </Alert>

    <Alert mb={6} bg="white" onClose={action('onClose')}>
      A group is a shared account that many people can use to collaborate on
      Are.na. You can also create a secret group to separate channels from your
      personal profile.
    </Alert>

    <Alert mb={6} bg="state.alert" color="white" onClose={action('onClose')}>
      Something went wrong! Try again.
    </Alert>

    <Alert
      mb={6}
      bg="white"
      color="state.alert"
      borderColor="state.alert"
      onClose={action('onClose')}
    >
      This is just a warning.
    </Alert>

    <Alert mb={6} bg="state.alert" color="white" onClose={action('onClose')}>
      Something went wrong! Try again.
    </Alert>

    <Alert mb={6} bg="black" color="white" isCloseable={false}>
      Just wanted to say hey.
    </Alert>

    <Alert bg="state.premium" color="white" isCloseable={false}>
      Subscribed! You’re all set!
    </Alert>
  </Specimen>
))
