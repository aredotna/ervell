import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { useMutation, useQuery } from '@apollo/client'

import Icons from 'v2/components/UI/Icons'
import Text from 'v2/components/UI/Text'
import { Input } from 'v2/components/UI/Inputs'
import Box from 'v2/components/UI/Box'

import { TableData } from 'v2/components/ChannelTableContents/lib/types'
import updateBlockCellMutation from 'v2/components/ChannelTableContents/components/PotentiallyEditableBlockCell/mutations/updateBlockCell'

import { ChannelTableContentsSet_channel_blokks } from '__generated__/ChannelTableContentsSet'
import {
  updateBlockCellMutation as updateBlockCellMutationType,
  updateBlockCellMutationVariables,
} from '__generated__/updateBlockCellMutation'
import {
  VerifyEditableBlock,
  VerifyEditableBlockVariables,
} from '__generated__/VerifyEditableBlock'
import verifyEditable from './query/verifyEditable'
import { unescape } from 'lodash'

type EditableCellMode =
  | 'resting'
  | 'checking'
  | 'editable'
  | 'editing'
  | 'saving'

const EditIcon = styled(Icons).attrs({
  name: 'Pencil',
  size: '0.75rem',
  color: 'gray.base',
  mr: 4,
})`
  cursor: pointer;
  position: absolute;
  right: 0;

  &:hover svg {
    fill: ${x => x.theme.colors.gray.block};
  }
`

const Inner = styled.div<{ mode: EditableCellMode }>`
  width: 100%;
  height: 100%;
  padding-left: ${x => x.theme.space[3]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  ${x =>
    x.mode === 'editing' &&
    `
      padding: 0;
    `}
`

const EditableInput = styled(Input)`
  width: 100%;
  height: 100%;
  background-color: ${x => x.theme.colors.gray.hint};
  border: 0 transparent;
  font-size: ${x => x.theme.fontSizes[1]};
  padding: ${x => x.theme.space[3]};

  &:focus {
    border: 0 transparent;
  }
`

export const PotentiallyEditableBlockCell: React.FC<{
  value: { block: TableData; attr: 'title' }
}> = ({ value: { block, attr } }) => {
  if ('isNull' in block || !block || !block.id) {
    return null
  }

  return <PotentiallyEditableBlockCellNonNull value={{ block, attr }} />
}

const PotentiallyEditableBlockCellNonNull = ({
  value: { block, attr = 'title' },
}: {
  value: { block: ChannelTableContentsSet_channel_blokks; attr: 'title' }
}): JSX.Element => {
  const { data } = useQuery<VerifyEditableBlock, VerifyEditableBlockVariables>(
    verifyEditable,
    {
      variables: { id: block?.id.toString() },
      ssr: false,
    }
  )

  const value = block[attr]
  const editable =
    data?.blokk.__typename !== 'Channel' && data?.blokk?.can?.manage
  const [mode, setMode] = useState<EditableCellMode>(
    editable ? 'editable' : 'resting'
  )
  const [attribute, setAttribute] = useState<string>(value)

  const [updateBlockCell] = useMutation<
    updateBlockCellMutationType,
    updateBlockCellMutationVariables
  >(updateBlockCellMutation)

  const handleOnClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
      e.stopPropagation()

      if (mode === 'editable') {
        setMode('editing')
      }
    },
    [mode]
  )

  const onChange = e => {
    setAttribute(e.target.value)
  }

  const saveValue = useCallback(() => {
    updateBlockCell({
      variables: { id: block?.id.toString(), [attr]: attribute },
    })
    setMode('editable')
  }, [updateBlockCell, attr, block, attribute])

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      saveValue()
    }
  }

  if (mode === 'editing') {
    return (
      <Inner onClick={handleOnClick} mode={mode}>
        <EditableInput
          defaultValue={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onBlur={saveValue}
          autoFocus
          width="100%"
          height="100%"
        />
        <Box />
      </Inner>
    )
  }

  return (
    <Inner mode={mode}>
      <Text f={1} overflowEllipsis pr={mode === 'editable' ? 7 : 0}>
        {unescape(attribute)}
      </Text>

      <Box />

      {mode === 'editable' && <EditIcon onClick={handleOnClick} />}
    </Inner>
  )
}
