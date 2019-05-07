import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Specimen from 'v2/stories/__components__/Specimen'
import Pulldown from 'v2/components/UI/Pulldown'
import ChannelVisibilityPulldown from 'v2/components/ChannelVisibilityPulldown'

const ExampleLabel = props => <span>{JSON.stringify(props)}</span>

storiesOf('Pulldown', module)
  .add('default', () => (
    <Specimen>
      <Pulldown
        value="open"
        onChange={action('onChange')}
        options={{
          open: 'Open',
          closed: 'Closed',
          private: 'Private',
        }}
      />

      <div>Some content beneath the pulldown</div>
    </Specimen>
  ))
  .add('with child components', () => (
    <Specimen>
      <Pulldown
        value="open"
        onChange={action('onChange')}
        options={{
          open: <ExampleLabel>Open</ExampleLabel>,
          closed: <ExampleLabel>Closed</ExampleLabel>,
          private: <ExampleLabel>Private</ExampleLabel>,
        }}
      />
    </Specimen>
  ))
  .add('stacking pulldowns', () => (
    <Specimen>
      <Pulldown
        mb={6}
        value="a"
        onChange={action('onChange')}
        options={{ a: 'a', b: 'b', c: 'c' }}
      />
      <Pulldown
        mb={6}
        value="b"
        onChange={action('onChange')}
        options={{ a: 'a', b: 'b', c: 'c' }}
      />
      <Pulldown
        mb={6}
        value="c"
        onChange={action('onChange')}
        options={{ a: 'a', b: 'b', c: 'c' }}
      />
    </Specimen>
  ))
  .add('ChannelVisibilityPulldown', () => (
    <Specimen>
      <ChannelVisibilityPulldown value="PUBLIC" onChange={action('onChange')} />
    </Specimen>
  ))
  .add('ChannelVisibilityPulldown (groups)', () => (
    <Specimen>
      <ChannelVisibilityPulldown
        value="PUBLIC"
        onChange={action('onChange')}
        type="GROUP"
      />
    </Specimen>
  ))
