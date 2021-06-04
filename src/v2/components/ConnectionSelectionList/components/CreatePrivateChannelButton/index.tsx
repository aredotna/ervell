import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import createPrivateChannelMutation from 'v2/components/ConnectionSelectionList/components/CreatePrivateChannelButton/mutations/createPrivateChannel'

import ColoredChannelSpan from 'v2/components/UI/ColoredChannelSpan'
import ListButton from 'v2/components/ConnectionSelectionList/components/ListButton'

import { OnConnectionSelectionType } from 'v2/components/ConnectionSelectionList'
import {
  createPrivateChannelMutation as CreatePrivateChannelMutation,
  createPrivateChannelMutationVariables as CreatePrivateChannelMutationVariables,
} from '__generated__/createPrivateChannelMutation'

interface CreatePrivateChannelButtonProps {
  title: string
  onConnectionCreation: OnConnectionSelectionType
  highlighted: boolean
}

export const CreatePrivateChannelButton: React.FC<CreatePrivateChannelButtonProps> = ({
  title,
  highlighted,
  onConnectionCreation,
}) => {
  const [mode, setMode] = useState<
    'resting' | 'creating' | 'connecting' | 'done' | 'error'
  >('resting')
  const [createPrivateChannel] = useMutation<
    CreatePrivateChannelMutation,
    CreatePrivateChannelMutationVariables
  >(createPrivateChannelMutation)

  const createAndConnect = () => {
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
  }

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
          }[mode]
        }
      </ColoredChannelSpan>
    </ListButton>
  )
}
