import React from 'react';
import { storiesOf } from '@storybook/react';

import theme from 'react/styles/theme';

import Specimen from 'react/stories/__components__/Specimen';

import { Label } from 'react/components/UI/Inputs';

storiesOf('Label', module)
  .add('Label - default', () => (
    <Specimen>
      <Label>Label on top</Label>
      <Label>Label below <a href="#">with link</a></Label>
    </Specimen>
  ))
  .add('Label - colors', () => (
    <div>
      {theme.meta.colorNames.map(color => (
        <Specimen>
          <Label color={color}>
            {color} <a href="#">with link</a>
          </Label>
        </Specimen>
      ))}
    </div>
  ));
