import React from 'react'
import { storiesOf } from '@storybook/react'

import Specimen from 'v2/stories/__components__/Specimen'
import Count from 'v2/components/UI/Count'

storiesOf('Count', module).add('default', () => (
  <Specimen>
    <Count amount={0} label="widget" />
    <br />
    <Count amount={1} label="widget" />
    <br />
    <Count amount={99} label="widget" />
  </Specimen>
))
