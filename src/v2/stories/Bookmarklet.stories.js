import React from 'react'
import { storiesOf } from '@storybook/react'

import Specimen from 'v2/stories/__components__/Specimen'

import Extension from 'v2/components/Bookmarklet/components/Extension'
import Bookmarklet from 'v2/components/Bookmarklet/components/Blocks'

storiesOf('Bookmarklet', module).add('Bookmarklet', () => (
  <Specimen>
    <Extension>
      <Bookmarklet />
    </Extension>
  </Specimen>
))
