import React from 'react';
import { storiesOf } from '@storybook/react';

import theme from 'v2/styles/theme';

import Specimen from 'v2/stories/__components__/Specimen';
import States from 'v2/stories/__components__/States';

import Text from 'v2/components/UI/Text';
import Box from 'v2/components/UI/Box';
import Badge from 'v2/components/UI/Badge';

storiesOf('Badge', module)
  .add('default', () => (
    <Specimen>
      <Badge>Group</Badge>
    </Specimen>
  ))
  .add('inline', () => (
    <Specimen>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Text f={7} fontWeight="bold" color="gray.medium">
          Are.na /
        </Text>

        <Text f={7} fontWeight="bold" ml={3}>
          Gang of Four
        </Text>

        <Badge ml={6} icon="Lock">
          Group
        </Badge>
      </Box>
    </Specimen>
  ))
  .add('sizes', () => (
    <Specimen>
      <States
        states={[
          { f: 1, icon: 'Lock', children: 'Group' },
          { f: 2, icon: 'Lock', children: 'Group' },
          { f: 3, icon: 'Lock', children: 'Group' },
        ]}
      >
        <Badge />
      </States>

      <States
        states={[
          { f: 4, icon: 'Lock', children: 'Group' },
          { f: 5, icon: 'Lock', children: 'Group' },
          { f: 6, icon: 'Lock', children: 'Group' },
        ]}
      >
        <Badge />
      </States>

      <States
        states={[
          { f: 7, icon: 'Lock', children: 'Group' },
          { f: 8, icon: 'Lock', children: 'Group' },
          { f: 9, icon: 'Lock', children: 'Group' },
        ]}
      >
        <Badge />
      </States>
    </Specimen>
  ))
  .add('colors', () => (
    <Specimen>
      {theme.meta.colorNames.map(color => (
        <States key={color} states={[{ color }]}>
          <Badge f={4} icon="ArenaMark">
            {color}
          </Badge>
        </States>
      ))}
    </Specimen>
  ));
