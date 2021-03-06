import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Specimen from 'v2/stories/__components__/Specimen'
import SearchInput from 'v2/components/UI/SearchInput'

storiesOf('SearchInput', module)
  .add('default', () => (
    <Specimen>
      <SearchInput
        onQueryChange={action('onQueryChange')}
        onDebouncedQueryChange={action('onDebouncedQueryChange')}
        placeholder="search"
      />
    </Specimen>
  ))
  .add('borderless', () => (
    <Specimen>
      <SearchInput
        onQueryChange={action('onQueryChange')}
        onDebouncedQueryChange={action('onDebouncedQueryChange')}
        placeholder="search"
        border={0}
      />
    </Specimen>
  ))
