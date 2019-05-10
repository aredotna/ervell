import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Link from 'v2/components/UI/Link'
import { Textarea } from 'v2/components/UI/Inputs'

const Choose = styled(Link)`
  position: relative;
  border-bottom: 1px solid;
  z-index: 1;
  cursor: pointer;
`

const Tip = styled(Box)`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  user-select: none;
`

const Input = styled(Textarea).attrs({
  resize: 'none',
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  background-color: transparent;

  &:focus {
    border: 0;
    background-color: ${props => props.theme.colors.gray.light};
    z-index: 2;
  }
`

const Message = styled(Box)`
  ${Text}:last-child {
    display: none;
  }
`

const Content = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;

  &:hover {
    background-color: ${props => props.theme.colors.gray.light};

    ${Message} {
      ${Text}:first-child {
        display: none;
      }

      ${Text}:last-child {
        display: block;
      }
    }
  }
`

export const AddBlockInner = ({
  openUploadDialog,
  inputKey,
  mode,
  onChange,
  onKeyDown,
}) => {
  return (
    <Content>
      <Message p={6}>
        <Text f={9} color="gray.medium">
          +
        </Text>

        <Text f={5} color="gray.medium">
          Drop or <Choose onClick={openUploadDialog}>choose</Choose> files,
          paste a URL (image, video, or link) or type text here
        </Text>
      </Message>

      <Input key={inputKey} onChange={onChange} onKeyDown={onKeyDown} />

      {mode === 'active' && (
        <Tip pb={4}>
          <Text f={0} color="gray.medium">
            shift + enter for line break
          </Text>
        </Tip>
      )}
    </Content>
  )
}
