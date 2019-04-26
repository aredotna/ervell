import React from 'react'
import { storiesOf } from '@storybook/react'

import Specimen from 'v2/stories/__components__/Specimen'

import NewChannelForm from 'v2/components/NewChannelForm'

storiesOf('NewChannelForm', module).add('default', () => (
  <Specimen>
    <NewChannelForm />
  </Specimen>
))
