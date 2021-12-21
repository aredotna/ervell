import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useLazyQuery, useMutation } from '@apollo/client'

import Icons from 'v2/components/UI/Icons'
import Text from 'v2/components/UI/Text'
import { Input } from 'v2/components/UI/Inputs'
import Box from 'v2/components/UI/Box'

import { TableData } from 'v2/components/ChannelTableContents/lib/types'
import updateBlockCellMutation from 'v2/components/ChannelTableContents/components/PotentiallyEditableBlockCell/mutations/updateBlockCell'
import verifyEditableQuery from 'v2/components/ChannelTableContents/components/PotentiallyEditableBlockCell/query/verifyEditable'

import { ChannelTableContentsSet_channel_blokks } from '__generated__/ChannelTableContentsSet'
import {
  updateBlockCellMutation as updateBlockCellMutationType,
  updateBlockCellMutationVariables,
} from '__generated__/updateBlockCellMutation'
import {
  VerifyEditableBlock,
  VerifyEditableBlockVariables,
} from '__generated__/VerifyEditableBlock'

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

  &:hover {
    color: ${x => x.theme.colors.gray.bold};
  }
`

const Inner = styled.div<{ mode: EditableCellMode }>`
  width: 100%;
  height: 100%;
  padding: ${x => x.theme.space[3]};
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${x =>
    x.mode === 'editing' &&
    `
      padding: 0;
    `}

  ${EditIcon} {
    display: none;
  }

  &:hover ${EditIcon} {
    display: block;
  }
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
  console.log({ block, attr }, "'isNull' in block", 'isNull' in block)
  if ('isNull' in block) {
    return null
  }

  return <PotentiallyEditableBlockCellNonNull value={{ block, attr }} />
}

const PotentiallyEditableBlockCellNonNull = ({
  value: { block, attr = 'title' },
}: {
  value: { block: ChannelTableContentsSet_channel_blokks; attr: 'title' }
}): JSX.Element => {
  const value = block[attr]
  const [mode, setMode] = useState<EditableCellMode>('resting')
  const [attribute, setAttribute] = useState<string>(value)

  const [verifyEditable, { data, loading }] = useLazyQuery<
    VerifyEditableBlock,
    VerifyEditableBlockVariables
  >(verifyEditableQuery, {
    variables: { id: block.id?.toString() },
    ssr: false,
  })

  const [updateBlockCell] = useMutation<
    updateBlockCellMutationType,
    updateBlockCellMutationVariables
  >(updateBlockCellMutation)

  const handleOnHover = useCallback(() => {
    verifyEditable()
  }, [verifyEditable])

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
      variables: { id: block.id.toString(), [attr]: attribute },
    })
    setMode('editable')
  }, [updateBlockCell, attr, block, attribute])

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      saveValue()
    }
  }

  useEffect(() => {
    if (loading) {
      setMode('checking')
    }

    if (data && data.blokk.__typename !== 'Channel') {
      setMode(data.blokk.can.manage ? 'editable' : 'resting')
    }
  }, [data, loading])

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
    <Inner onMouseOver={handleOnHover} mode={mode}>
      <Text f={1} overflowEllipsis>
        {attribute}
      </Text>

      <Box />

      {mode === 'editable' && <EditIcon onClick={handleOnClick} />}
    </Inner>
  )
}
