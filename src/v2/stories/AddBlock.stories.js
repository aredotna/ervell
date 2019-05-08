import React from 'react'
import { storiesOf } from '@storybook/react'

import Specimen from 'v2/stories/__components__/Specimen'

import AddBlock from 'v2/components/AddBlock'
import Grid from 'v2/components/UI/Grid/'
import GridItem from 'v2/components/UI/Grid/components/GridItem'

storiesOf('AddBlock', module).add('default', () => (
  <Specimen>
    <Grid>
      <GridItem>
        <AddBlock channel_id="foobar" />
      </GridItem>

      <GridItem>
        <AddBlock channel_id="foobar" isOverPrivateLimit />
      </GridItem>
    </Grid>
  </Specimen>
))
