import React, { useCallback, useState } from 'react'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import GenericButton from 'v2/components/UI/GenericButton'

import {
  deleteChannelMutation,
  deleteChannelMutationVariables,
} from '__generated__/deleteChannelMutation'
import deleteChannelMutationQuery from 'v2/components/ManageChannel/components/DeleteChannel/mutations/deleteChannel'
import { useMutation } from '@apollo/client'

interface DeleteChannelProps {
  id: string
  onDelete: () => void
  refetchQueries: any
}

export const DeleteChannel: React.FC<DeleteChannelProps> = ({
  id,
  onDelete,
  refetchQueries,
}) => {
  const [mode, setMode] = useState<
    'pending' | 'resting' | 'deleting' | 'deleted' | 'error'
  >('resting')
  const [deleteChannel] = useMutation<
    deleteChannelMutation,
    deleteChannelMutationVariables
  >(deleteChannelMutationQuery, { variables: { id }, refetchQueries })

  const pendDeleteChannel = useCallback(() => {
    setMode('pending')
  }, [setMode])

  const cancelDeleteChannel = useCallback(() => {
    setMode('resting')
  }, [setMode])

  const handleDelete = useCallback(() => {
    if (mode !== 'pending') return null
    setMode('deleting')
    deleteChannel()
      .then(() => {
        setMode('deleted')
        onDelete()
      })
      .catch(e => {
        console.error(e)
        setMode('error')
      })
  }, [deleteChannel, mode])

  return (
    <div>
      <Text f={2} fontWeight="bold" color="state.alert">
        <a
          role="button"
          tabIndex={0}
          onClick={pendDeleteChannel}
          style={{ cursor: 'pointer' }}
        >
          Delete channel
        </a>
      </Text>

      {mode !== 'resting' && (
        <Box my={3}>
          {mode === 'error' && (
            <Text mb={6} f={2} color="state.alert">
              An error has occurred. Try again.
            </Text>
          )}

          {mode === 'deleting' && (
            <Text mb={6} f={2} color="state.alert">
              Deleting...
            </Text>
          )}

          {mode === 'deleted' && (
            <Text mb={6} f={2} color="state.alert">
              Deleted!
            </Text>
          )}

          {mode === 'pending' && (
            <div>
              <Text mb={6} f={2} color="state.alert">
                Are you sure? This action cannot be undone.
              </Text>

              <div>
                <GenericButton
                  f={2}
                  minWidth="6em"
                  color="state.alert"
                  onClick={handleDelete}
                >
                  Delete
                </GenericButton>{' '}
                <GenericButton
                  f={2}
                  minWidth="6em"
                  color="state.alert"
                  onClick={cancelDeleteChannel}
                >
                  Cancel
                </GenericButton>
              </div>
            </div>
          )}
        </Box>
      )}
    </div>
  )
}

export default DeleteChannel
