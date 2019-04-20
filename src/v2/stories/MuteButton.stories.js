import React from 'react';
import { storiesOf } from '@storybook/react';

import MuteButton from 'v2/components/MuteButton';

storiesOf('MuteButton', module).add('default', () => (
  <MuteButton id={666} type="BLOCK" />
));
