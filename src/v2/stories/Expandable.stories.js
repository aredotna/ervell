import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'v2/stories/__components__/Specimen';
import Text from 'v2/components/UI/Text';
import Expandable from 'v2/components/UI/Expandable';
import {
  Expandable as ExpandableSet,
  ExpandableContext,
} from 'v2/components/UI/ExpandableSet';

const overflowingText = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Nam ornare ante vehicula tortor auctor, eget dapibus elit tincidunt.
  Donec bibendum est purus, sit amet iaculis tellus ornare sit amet.
  Donec nec leo vehicula ante iaculis pulvinar egestas a nisl.
  Proin pulvinar, quam in euismod egestas, risus orci sollicitudin quam,
  a facilisis risus mi at nisl.
  Vivamus est metus, vestibulum eu tincidunt at, tincidunt vel tortor.
  Phasellus id mi metus.
  Nam imperdiet eget ligula quis lacinia.
  Duis at suscipit lacus.
  Phasellus consequat justo at lacus porttitor faucibus.
  Vivamus rhoncus, tortor et suscipit cursus, urna lorem placerat magna,
  quis pretium mauris metus a felis.
  Vivamus tempor justo dui, in mollis risus interdum eu.
  Vestibulum quis neque eget mi ullamcorper luctus sed eu nisi.
  Vivamus arcu justo, gravida sed risus ac, elementum interdum lectus.
  Ut at tempor ex.
  Sed ac felis elit.
`;

storiesOf('Expandable', module)
  .add('default', () => (
    <Specimen>
      <Expandable height="100px">
        <Text>{overflowingText}</Text>
      </Expandable>
    </Specimen>
  ))
  .add('ExpandableSet', () => (
    <Specimen>
      <ExpandableContext>
        <ExpandableSet>
          <Text>{overflowingText}</Text>
        </ExpandableSet>

        <ExpandableSet>
          <Text>Not overflowing</Text>
        </ExpandableSet>

        <ExpandableSet>
          <Text>{overflowingText}</Text>
        </ExpandableSet>

        <ExpandableSet>
          <Text>{overflowingText}</Text>
        </ExpandableSet>
      </ExpandableContext>
    </Specimen>
  ));
