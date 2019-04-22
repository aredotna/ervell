import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Box from 'react/components/UI/Box';
import TitledDialog from 'react/components/UI/TitledDialog';
import Specimen from 'react/stories/__components__/Specimen';

storiesOf('TitledDialog', module)
  .add('TitledDialog', () => (
    <Specimen>
      <Box height="20em" border="1px dashed red">
        <TitledDialog
          title="Example form"
          onDone={(e) => {
            e.preventDefault();
            action('onDone')(e);
          }}
        >
          Some content
        </TitledDialog>
      </Box>
    </Specimen>
  ))
  .add('TitledDialog - overflowing content', () => (
    <Specimen>
      <Box height="20em" border="1px dashed red">
        <TitledDialog
          title="Example form"
          onDone={(e) => {
            e.preventDefault();
            action('onDone')(e);
          }}
        >
          {Array(100).fill('Overflow').map(filler => (
            <div>{filler}</div>
          ))}
        </TitledDialog>
      </Box>
    </Specimen>
  ));
