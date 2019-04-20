import React from 'react';
import { storiesOf } from '@storybook/react';

import theme from 'v2/styles/theme';

import ColorSwatch from 'v2/stories/__components__/ColorSwatch';
import Measurement from 'v2/stories/__components__/Measurement';

import Text from 'v2/components/UI/Text';
import Pre from 'v2/components/UI/Pre';
import Specimen from './__components__/Specimen';

storiesOf('Styles', module)
  .add('Theme', () => <Pre>{JSON.stringify(theme, null, 2)}</Pre>)
  .add('Colors', () => (
    <div>
      {theme.meta.colorNames.map(color => (
        <ColorSwatch color={color} />
      ))}
    </div>
  ))
  .add('Fonts', () => (
    <div>
      {Object.keys(theme.fonts).map(font => (
        <Text font={font} fontSize={5} lineHeight={1}>
          {font} = {theme.fonts[font]}
        </Text>
      ))}
    </div>
  ))
  .add('Space', () => (
    <div>
      {theme.space.map((unit, i) => (
        <Specimen>
          <Measurement name={i} value={unit} />
        </Specimen>
      ))}
    </div>
  ));
