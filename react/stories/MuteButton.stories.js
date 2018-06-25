import React from 'react';
import { storiesOf } from '@storybook/react';

import MuteButton from 'react/components/MuteButton/index';

storiesOf('MuteButton', module)
  .add('unstyled', () => (
    <MuteButton id={666} type="BLOCK" />
  ));
