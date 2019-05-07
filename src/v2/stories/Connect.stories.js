import React from 'react'
import { storiesOf } from '@storybook/react'

import Specimen from 'v2/stories/__components__/Specimen'

import ConnectionSelection from 'v2/components/ConnectionSelection'

storiesOf('Connect', module).add('ConnectionSelection', () => (
  <Specimen>
    <ConnectionSelection id={999} type="BLOCK" />
  </Specimen>
))
