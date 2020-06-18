import React, { useState } from 'react'
import styled from 'styled-components'

import Label from 'v2/components/UI/Inputs/components/Label'
import Box from 'v2/components/UI/Box'

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const Icon = styled.svg`
  fill: none;
  stroke: ${props => props.theme.colors.gray.bold};
  stroke-width: 2px;
`

const StyledCheckbox = styled(Box).attrs({ mr: 6 })`
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  border-radius: 3px;
  box-shadow: 0 0 0 1px
    ${props =>
      props.disabled
        ? props.theme.colors.gray.light
        : props.theme.colors.gray.bold};

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`

const CheckboxContainer = styled(Box).attrs({ p: 4 })`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const CheckboxLabel = styled(Label)`
  font-weight: normal;
  user-select: none;
`

interface CheckboxProps {
  checked: boolean
  disabled?: boolean
  className?: string
  onChange?: (any) => void
}

const LargeLabeledCheckbox: React.FC<CheckboxProps> = ({
  checked,
  disabled,
  className,
  children,
  onChange,
  ...props
}) => {
  const [isChecked, setChecked] = useState(checked)
  const handleChecked = () => {
    setChecked(!checked)
    onChange(!checked)
  }
  return (
    <CheckboxContainer className={className} onClick={handleChecked}>
      <HiddenCheckbox defaultChecked={isChecked} {...props} checked={checked} />
      <StyledCheckbox
        defaultChecked={isChecked}
        checked={checked}
        disabled={disabled}
      >
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
      <CheckboxLabel f={4}>{children}</CheckboxLabel>
    </CheckboxContainer>
  )
}

export default LargeLabeledCheckbox
