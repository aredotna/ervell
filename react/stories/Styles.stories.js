import React from 'react';
import { storiesOf } from '@storybook/react';

import { COLOR_KEYS } from 'react/styles/Colors';

import ColorSwatch from 'react/stories/__components__/ColorSwatch';

storiesOf('Styles', module)
  .add('Colors', () => (
    <div>
      {COLOR_KEYS.map(color => (
        <ColorSwatch color={color} />
      ))}
    </div>
  ));
