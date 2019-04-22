import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Specimen from 'react/stories/__components__/Specimen';
import LoadableImage from 'react/components/UI/LoadableImage';

storiesOf('LoadableImage', module)
  .add('default', () => (
    <Specimen>
      <LoadableImage
        src="https://placeimg.com/800/800"
        onLoad={action('onLoad')}
        onError={action('onError')}
      />
    </Specimen>
  ))
  .add('error', () => (
    <Specimen>
      <LoadableImage
        src="http://example.com/wrong.jpg"
        onLoad={action('onLoad')}
        onError={action('onError')}
      />
    </Specimen>
  ));
