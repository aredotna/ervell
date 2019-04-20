import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';

import Accordion from 'react/components/UI/Accordion';
import Text from 'react/components/UI/Text';

const sampleCopy = `
  Accordions (from 19th-century German Akkordeon, from Akkord—"musical chord,
  concord of sounds") are a family of box-shaped musical instruments of the
  bellows-driven free-reed aerophone type, colloquially referred to as a squeezebox.
  A person who plays the accordion is called an accordionist. The concertina and
  bandoneón are related; the harmonium and American reed organ are in the same family.
`;

storiesOf('Accordion', module)
  .add('default', () => (
    <Specimen>
      <Accordion label="Section A">
        <Text p={2}>{sampleCopy}</Text>
      </Accordion>

      <Accordion label="Section B">
        <Text p={2}>{sampleCopy}</Text>
      </Accordion>

      <Accordion label="Section C" mode="closed">
        <Text p={2}>{sampleCopy}</Text>
      </Accordion>

      <Accordion label="Section D" mode="closed">
        <Text p={2}>{sampleCopy}</Text>
      </Accordion>
    </Specimen>
  ));
