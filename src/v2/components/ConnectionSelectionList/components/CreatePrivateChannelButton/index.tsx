import React, { useCallback, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import createPrivateChannelMutation from 'v2/components/ConnectionSelectionList/components/CreatePrivateChannelButton/mutations/createPrivateChannel'

import ColoredChannelSpan from 'v2/components/UI/ColoredChannelSpan'
import ListButton from 'v2/components/ConnectionSelectionList/components/ListButton'

import { OnConnectionSelectionType } from 'v2/components/ConnectionSelectionList'
import {
  createPrivateChannelMutation as CreatePrivateChannelMutation,
  createPrivateChannelMutationVariables as CreatePrivateChannelMutationVariables,
} from '__generated__/createPrivateChannelMutation'

export type Mode = 'resting' | 'creating' | 'connecting' | 'done' | 'error'

interface CreatePrivateChannelButtonProps {
  title: string
  onConnectionCreation: OnConnectionSelectionType
  highlighted: boolean
  mode?: Mode
}

export const CreatePrivateChannelButton: React.FC<CreatePrivateChannelButtonProps> = ({
  title,
  highlighted,
  onConnectionCreation,
  mode = 'resting',
}) => {
  const [actualMode, setMode] = useState<Mode>(mode)

  useEffect(() => {
    setMode(mode)
  }, [mode])

  const [createPrivateChannel] = useMutation<
    CreatePrivateChannelMutation,
    CreatePrivateChannelMutationVariables
  >(createPrivateChannelMutation)

  const createAndConnect = useCallback(() => {
    setMode('creating')

    createPrivateChannel({ variables: { title } })
      .then(
        ({
          data: {
            create_channel: { channel: newChannel },
          },
        }) => {
          setMode('connecting')
          return onConnectionCreation(true, newChannel)
        }
      )
      .then(() => {
        setMode('done')
      })
      .catch(err => {
        console.error(err)
        setMode('error')
      })
  }, [createPrivateChannel, onConnectionCreation, title])

  return (
    <ListButton onClick={createAndConnect} highlighted={highlighted}>
      <ColoredChannelSpan visibility="private">
        {
          {
            resting: `+ New private channel “${title}”`,
            creating: `Creating ${title}...`,
            connecting: `Connecting ${title}...`,
            done: `Created and connected to ${title} ✔`,
            error: 'An error occurred',
          }[actualMode]
        }
      </ColoredChannelSpan>
    </ListButton>
  )
}
