import React, { useState } from 'react'
import styled from 'styled-components'

import { storiesOf } from '@storybook/react'

import Specimen from 'v2/stories/__components__/Specimen'

import { LargeLabelledCheckbox } from 'v2/components/UI/Inputs'
import Box from 'v2/components/UI/Box'

const CheckboxContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`

storiesOf('Checkbox', module).add('default', () => {
  const [checked, setChecked] = useState(true)
  return (
    <Specimen>
      <CheckboxContainer>
        <LargeLabelledCheckbox
          name="text"
          checked={checked}
          onChange={() => setChecked(!checked)}
        >
          Send me the monthly Are.na newsletter
        </LargeLabelledCheckbox>
      </CheckboxContainer>
    </Specimen>
  )
})
