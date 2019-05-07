import React from 'react'
import { storiesOf } from '@storybook/react'

import theme from 'v2/styles/theme'

import Text from 'v2/components/UI/Text'
import States from 'v2/stories/__components__/States'

const SAMPLE_PARAGRAPH =
  '“They sense that I’m different, more like their own organic mines. They don’t like it. I believe they will begin to withdraw from this area, soon. Apparently they don’t want to get involved with me. They’re an odd race, Philip. I would have liked to study them closely, try to learn something about them. I’m of the opinion that they use no inert material. All their equipment and instruments are alive, in some form or other. They don’t construct or build at all. The idea of making is foreign to them. They utilize existing forms. Even their ships—”'

storiesOf('Text', module).add('paragraphs', () => (
  <div>
    {theme.fontSizes.map((_fontSize, f) => (
      <States
        states={[
          { f, lineHeight: 0 },
          { f, lineHeight: 1 },
          { f, lineHeight: 2 },
        ]}
        key={f}
      >
        <Text>{SAMPLE_PARAGRAPH}</Text>
      </States>
    ))}
  </div>
))
