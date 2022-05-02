import { useMutation, useQuery } from '@apollo/client'
import React, { useCallback } from 'react'

import GenericButton from 'v2/components/UI/GenericButton'
import Icons from 'v2/components/UI/Icons'

import isMuted from './queries/isMuted'
import muteProfile from './mutations/muteProfile'
import unMuteProfile from './mutations/unmuteProfile'

import { MutableTypeEnum } from '__generated__/globalTypes'
import {
  MuteProfileMutation,
  MuteProfileMutationVariables,
} from '__generated__/MuteProfileMutation'
import {
  ProfileIsMutedQuery,
  ProfileIsMutedQueryVariables,
} from '__generated__/ProfileIsMutedQuery'
import {
  UnmuteProfileMutation,
  UnmuteProfileMutationVariables,
} from '__generated__/UnmuteProfileMutation'

interface MuteProfileButtonProps {
  id: string
}

export const MuteProfileButton: React.FC<MuteProfileButtonProps> = ({
  id,
  ...rest
}) => {
  const { data } = useQuery<ProfileIsMutedQuery, ProfileIsMutedQueryVariables>(
    isMuted,
    { variables: { id, type: MutableTypeEnum.USER } }
  )
  const [mute] = useMutation<MuteProfileMutation, MuteProfileMutationVariables>(
    muteProfile,
    { variables: { id, type: MutableTypeEnum.USER } }
  )
  const [unmute] = useMutation<
    UnmuteProfileMutation,
    UnmuteProfileMutationVariables
  >(unMuteProfile, { variables: { id, type: MutableTypeEnum.USER } })

  const mutations = {
    mute: mute,
    unmute: unmute,
  }

  const toggleMute = useCallback(() => {
    const action = data?.mutable.is_muted ? 'unmute' : 'mute'
    const mutation = mutations[action]
    const options = {
      optimisticResponse: {
        __typename: 'Mutation',
        [action]: {
          __typename: 'MutePayload',
          mutable: {
            ...data.mutable,
            is_muted: !data.mutable.is_muted,
          },
        },
      },
    }

    mutation(options as any).catch(err => {
      console.log(err)
    })
  }, [data?.mutable])

  const actionName = { true: 'Unmute', false: 'Mute' }[
    data?.mutable?.is_muted?.toString()
  ]

  return (
    <GenericButton onClick={toggleMute} {...rest}>
      <Icons name={actionName} size="1rem" mr={4} color="gray.medium" />
      {actionName} Person
    </GenericButton>
  )
}
