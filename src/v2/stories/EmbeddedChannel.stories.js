import React from 'react'
import { storiesOf } from '@storybook/react'

import Specimen from 'v2/stories/__components__/Specimen'

import { EmbeddedChannel } from 'v2/pages/channel/EmbeddedChannelPage/components/EmbeddedChannel'

storiesOf('EmbeddedChannel', module).add('default', () => (
  <Specimen>
    <EmbeddedChannel id="hello" />
  </Specimen>
))
