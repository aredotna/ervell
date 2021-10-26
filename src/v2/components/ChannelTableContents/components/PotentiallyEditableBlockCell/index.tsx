import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Text from 'v2/components/UI/Text'

import { ChannelTableContentsSet_channel_blokks } from '__generated__/ChannelTableContentsSet'
import {
  updateBlockCellMutation as updateBlockCellMutationType,
  updateBlockCellMutationVariables,
} from '__generated__/updateBlockCellMutation'
import {
  VerifyEditableBlock,
  VerifyEditableBlockVariables,
} from '__generated__/VerifyEditableBlock'
import updateBlockCellMutation from './mutations/updateBlockCell'
import verifyEditableQuery from './query/verifyEditable'

type EditableCellMode =
  | 'resting'
  | 'checking'
  | 'editable'
  | 'editing'
  | 'saving'

const Inner = styled.div<{ mode: EditableCellMode }>`
  width: 100%;
  height: 100%;
  padding: ${x => x.theme.space[3]};
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${x =>
    x.mode === 'editable' &&
    `
    cursor: text;
    &:hover {
      background-color: ${x.theme.colors.gray.hint};
    }
  `}
`

const EditableInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: ${x => x.theme.colors.gray.hint};
  border: 0;
`

export const PotentiallyEditableBlockCell = ({
  value: { block },
  attr = 'title',
}: {
  value: { block: ChannelTableContentsSet_channel_blokks }
  attr: 'title'
}): JSX.Element => {
  const value = block[attr]
  const [mode, setMode] = useState<EditableCellMode>('resting')
  const [attribute, setAttribute] = useState<string>(value)

  const [verifyEditable, { data, loading }] = useLazyQuery<
    VerifyEditableBlock,
    VerifyEditableBlockVariables
  >(verifyEditableQuery, { variables: { id: block.id?.toString() } })

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
      <Inner onClick={handleOnClick}>
        <EditableInput
          defaultValue={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onBlur={saveValue}
          autoFocus
        />
      </Inner>
    )
  }

  return (
    <Inner onMouseOver={handleOnHover} onClick={handleOnClick} mode={mode}>
      <Text f={1} overflowEllipsis>
        {attribute}
      </Text>
    </Inner>
  )
}
