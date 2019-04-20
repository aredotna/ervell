import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';
import Box from 'react/components/UI/Box';
import StripeContext from 'react/components/StripeContext';

import MyCreditCard from 'react/components/MyCreditCard';

storiesOf('MyCreditCard', module)
  .add('MyCreditCard', () => (
    <Specimen>
      <Box height="40em" width="35em" border="1px dashed red">
        <StripeContext>
          <MyCreditCard />
        </StripeContext>
      </Box>
    </Specimen>
  ));
