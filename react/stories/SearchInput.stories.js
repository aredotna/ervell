import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Text from 'react/components/UI/Text';
import SearchInput from 'react/components/UI/SearchInput';

storiesOf('SearchInput', module)
  .add('default', () => (
    <div>
      <SearchInput
        onQueryChange={action('onQueryChange')}
        placeholder="search"
      />

      <Text font="mono" f={2} my={5}>
        TODO: Replace Iconic glyphs with SVGs
      </Text>
    </div>
  ));
