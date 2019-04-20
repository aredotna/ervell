import React from 'react';
import { storiesOf } from '@storybook/react';

import theme from 'v2/styles/theme';

import Specimen from 'v2/stories/__components__/Specimen';

import { Label } from 'v2/components/UI/Inputs';

storiesOf('Label', module)
  .add('Label - default', () => (
    <Specimen>
      <Label>Label on top</Label>
      <Label>
        Label below <a href="#">with link</a>
      </Label>
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
