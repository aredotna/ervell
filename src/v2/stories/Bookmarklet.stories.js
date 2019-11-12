import React from 'react'
import { storiesOf } from '@storybook/react'

import Specimen from 'v2/stories/__components__/Specimen'

import Bookmarklet from 'v2/components/Bookmarklet/components/Blocks'

storiesOf('Bookmarklet', module).add('Bookmarklet', () => (
  <Specimen>
    <Bookmarklet />
  </Specimen>
))
