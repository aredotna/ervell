import React from 'react';
import { storiesOf } from '@storybook/react';

import MuteButton from 'react/components/MuteButton/index';

storiesOf('Components', module)
  .add('MuteButton', () => (
    <MuteButton id={666} type="BLOCK" />
  ));
