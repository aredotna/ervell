import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';
import Pulldown from 'react/components/UI/Pulldown';

const ExampleLabel = props => (
  <span>{JSON.stringify(props)}</span>
);

storiesOf('Pulldown', module)
  .add('default', () => (
    <Specimen>
      <Pulldown
        value="open"
        options={{
          open: 'Open',
          closed: 'Closed',
          private: 'Private',
        }}
      />
    </Specimen>
  ))
  .add('with child components', () => (
    <Specimen>
      <Pulldown
        value="open"
        options={{
          open: <ExampleLabel>Open</ExampleLabel>,
          closed: <ExampleLabel>Closed</ExampleLabel>,
          private: <ExampleLabel>Private</ExampleLabel>,
        }}
      />
    </Specimen>
  ));
