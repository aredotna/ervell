import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Specimen from 'react/stories/__components__/Specimen';

import ToggleSwitch from 'react/components/UI/ToggleSwitch';

storiesOf('ToggleSwitch', module)
  .add('default', () => (
    <Specimen>
      <ToggleSwitch onToggle={action('onToggle')} />
      <ToggleSwitch onToggle={action('onToggle')} />
      <ToggleSwitch onToggle={action('onToggle')} />
      <ToggleSwitch onToggle={action('onToggle')} />
    </Specimen>
  ))
  .add('colors', () => (
    <Specimen>
      <ToggleSwitch activeColor="state.premium" inactiveColor="gray.semiBold" onToggle={action('onToggle')} />
      <ToggleSwitch activeColor="state.premium" inactiveColor="gray.semiBold" onToggle={action('onToggle')} />
      <ToggleSwitch activeColor="state.premium" inactiveColor="gray.semiBold" onToggle={action('onToggle')} />
      <ToggleSwitch activeColor="state.investor" inactiveColor="state.alert" onToggle={action('onToggle')} />
    </Specimen>
  ));
