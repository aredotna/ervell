import React, { useCallback } from 'react'
import { useMutation } from '@apollo/client'

import styled from 'styled-components'

import Text from 'v2/components/UI/Text'
import { GenericButton as Button } from 'v2/components/UI/GenericButton'
import { Input } from 'v2/components/UI/Inputs'
import CopyToClipboard from 'v2/components/UI/CopyToClipboard'

import CREATE_GROUP_INVITE_CODE_MUTATION from 'v2/components/ManageGroup/components/Invite/mutations/createGroupInvite'
import {
  CreateGroupInvite as CreateGroupInviteMutation,
  CreateGroupInviteVariables as CreateGroupInviteMutationVariables,
} from '__generated__/CreateGroupInvite'

import DELETE_GROUP_INVITE_CODE_MUTATION from 'v2/components/ManageGroup/components/Invite/mutations/deleteGroupInvite'
import {
  DeleteGroupInvite as DeleteGroupInviteMutation,
  DeleteGroupInviteVariables as DeleteGroupInviteMutationVariables,
} from '__generated__/DeleteGroupInvite'

import MANAGE_GROUP_QUERY from 'v2/components/ManageGroup/queries/manageGroup'

import { ManageGroup as Group } from '__generated__/ManageGroup'

const ButtonLink = styled.a.attrs({
  role: 'button',
  tabIndex: 0,
})`
  display: block;
  cursor: pointer;
  font-weight: bold;
`

const CopyLink = styled(CopyToClipboard).attrs({ f: 1 })`
  font-weight: bold;
`

interface GroupInviteInviteProps {
  group: Group
}

export const GroupInvite: React.FC<GroupInviteInviteProps> = ({ group }) => {
  const [createInviteCode] = useMutation<
    CreateGroupInviteMutation,
    CreateGroupInviteMutationVariables
  >(CREATE_GROUP_INVITE_CODE_MUTATION)

  const [deleteInviteCode] = useMutation<
    DeleteGroupInviteMutation,
    DeleteGroupInviteMutationVariables
  >(DELETE_GROUP_INVITE_CODE_MUTATION)

  const onCreate = useCallback(
    e => {
      e.preventDefault()
      createInviteCode({
        variables: { group_id: group.id.toString() },
        refetchQueries: [
          { query: MANAGE_GROUP_QUERY, variables: { id: group.id } },
        ],
      })
    },
    [createInviteCode, group.id]
  )

  const onDelete = useCallback(
    e => {
      e.preventDefault()
      deleteInviteCode({
        variables: { group_id: group.id.toString() },
        refetchQueries: [
          { query: MANAGE_GROUP_QUERY, variables: { id: group.id } },
        ],
      })
    },
    [deleteInviteCode, group.id]
  )

  return (
    <>
      {!group.invite && (
        <>
          <Text f={1}>
            Add new members to <strong>{group.name}</strong> by creating an
            invite link and sending it to your contacts.
          </Text>
          <Button f={1} my={6} bg="background" onClick={onCreate}>
            Generate invite link
          </Button>
          <Text f={1} mt={3}>
            <em>
              Invite links can be only be created by the group admin and can be
              removed at any time.
            </em>
          </Text>
        </>
      )}

      {group.invite && (
        <>
          <Text f={1} mb={4}>
            Anyone with this link can join your group. Group members can view
            and add content.
          </Text>
          <Input f={1} mb={4} value={`${group.invite.href}`} readOnly />
          <CopyLink
            label="Copy invite link"
            value={`${group.invite.href}`}
            boldLinks
            hoverLinks={{ color: 'gray.bold' }}
          />
          <ButtonLink onClick={onDelete}>
            <Text f={1} boldLinks hoverLinks={{ color: 'gray.bold' }}>
              Disable invite link
            </Text>
          </ButtonLink>
        </>
      )}
    </>
  )
}
