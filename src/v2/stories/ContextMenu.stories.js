import React from 'react'
import { storiesOf } from '@storybook/react'

import Specimen from 'v2/stories/__components__/Specimen'
import { ContextMenu } from 'v2/components/ContextMenu'

storiesOf('ContextMenu', module).add('default', () => (
  <Specimen>
    <ContextMenu>
      <ContextMenu.Option>Option 1</ContextMenu.Option>
      <ContextMenu.Option>Option 2</ContextMenu.Option>
      <ContextMenu.Option>Option 3</ContextMenu.Option>

      <ContextMenu.Divider />

      <ContextMenu.Option>Option 4</ContextMenu.Option>
      <ContextMenu.Option>Option 5</ContextMenu.Option>
      <ContextMenu.Option>Option 6</ContextMenu.Option>
    </ContextMenu>
  </Specimen>
))
