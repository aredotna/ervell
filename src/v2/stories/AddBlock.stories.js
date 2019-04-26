import React from 'react'
import { storiesOf } from '@storybook/react'

import Specimen from 'v2/stories/__components__/Specimen'

import AddBlock from 'v2/components/AddBlock'
import { TestComponent } from 'v2/components/AddBlock/Test'

storiesOf('AddBlock', module).add('default', () => (
  <Specimen>
    <TestComponent />
    <AddBlock channel_id="foobar" />
  </Specimen>
))
