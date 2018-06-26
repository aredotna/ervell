import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { borders, borderColor } from 'styled-system';

import Text from 'react/components/UI/Text';
import TickerTapeHover from 'react/components/UI/TickerTapeHover';

const SAMPLE_PARAGRAPH = '“They sense that I’m different, more like their own organic mines. They don’t like it. I believe they will begin to withdraw from this area, soon. Apparently they don’t want to get involved with me. They’re an odd race, Philip. I would have liked to study them closely, try to learn something about them. I’m of the opinion that they use no inert material. All their equipment and instruments are alive, in some form or other. They don’t construct or build at all. The idea of making is foreign to them. They utilize existing forms. Even their ships—”';

const Container = styled.div.attrs({
  border: '2px solid',
  borderColor: 'state.premium',
})`
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  ${borders}
  ${borderColor}
`;

storiesOf('TickerTapeHover', module)
  .add('default', () => (
    <div>
      <Container>
        <TickerTapeHover>
          <Text>{SAMPLE_PARAGRAPH}</Text>
        </TickerTapeHover>
      </Container>

      <Text font="mono" f={2} my={5}>
        USAGE NOTE: Content must be overflowing.
        <br />
        {'<TickerTapeHover>'} does not impose any styling on children.
      </Text>
    </div>
  ));
