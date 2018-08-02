import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';
import States from 'react/stories/__components__/States';

import Icon, { ICON_NAMES } from 'react/components/UI/Icon';

storiesOf('Icons', module)
  .add('Names', () => (
    <div>
      {ICON_NAMES.map(name => (
        <Specimen key={name}>
          {name}: <Icon name={name} />
        </Specimen>
      ))}
    </div>
  ))
  .add('Configuration', () => (
    <States
      states={[
        { name: 'ArenaMark', size: 6, color: 'state.premium' },
        { name: 'ArenaMark', size: 7, color: 'state.investor' },
        { name: 'ArenaMark', size: 9, color: 'gray.base' },
      ]}
    >
      <Icon />
    </States>
  ));
