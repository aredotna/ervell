import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'v2/stories/__components__/Specimen';
import States from 'v2/stories/__components__/States';

import Button from 'v2/components/UI/GenericButton';
import ButtonGroup from 'v2/components/UI/ButtonGroup';
import Icons, { ICON_NAMES } from 'v2/components/UI/Icons';

storiesOf('Icons', module)
  .add('Names', () => (
    <div>
      {ICON_NAMES.map(name => (
        <Specimen key={name}>
          {name}: <Icons name={name} />
        </Specimen>
      ))}
    </div>
  ))
  .add('Configuration', () => (
    <States
      states={[
        { name: 'ArenaMark', size: 6, color: 'state.premium' },
        { name: 'ArenaMark', size: 7, color: 'state.investor' },
        { name: 'ArenaMark', size: 9, color: 'gray.base' },
      ]}
    >
      <Icons />
    </States>
  ))
  .add('Button with icon', () => (
    <div>
      <Specimen>
        <Button>
          <Icons mr={3} name="Lock" color="gray.base" /> Locked button
        </Button>
      </Specimen>

      <Specimen>
        <Button f={2}>
          <Icons mr={3} name="Lock" color="gray.base" /> Small locked button
        </Button>
      </Specimen>

      <Specimen>
        <ButtonGroup f={1}>
          <Button>Something</Button>

          <Button>
            <Icons mr={3} name="Lock" color="gray.base" /> Smaller locked button
          </Button>
        </ButtonGroup>
      </Specimen>
    </div>
  ));
