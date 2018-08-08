import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Specimen from 'react/stories/__components__/Specimen';
import SearchInput from 'react/components/UI/SearchInput';

storiesOf('SearchInput', module)
  .add('default', () => (
    <Specimen>
      <SearchInput
        onQueryChange={action('onQueryChange')}
        placeholder="search"
      />
    </Specimen>
  ));
