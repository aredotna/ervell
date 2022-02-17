import React, { useCallback } from 'react'
import styled from 'styled-components'

import Text from 'v2/components/UI/Text'
import Box from 'v2/components/UI/Box'
import Modal from 'v2/components/UI/Modal'
import { GenericButton as Button } from 'v2/components/UI/GenericButton'
import NewChannelForm from 'v2/components/NewChannelForm'
import ManageGroup from 'v2/components/ManageGroup'
import { EmptyProfile } from '__generated__/EmptyProfile'
import { useSearchParams } from 'v2/hooks/useSearchParams'

const Copy = styled(Text)`
  text-align: center;
  a {
    font-weight: bold;
  }
  a:hover {
    color: ${x => x.theme.colors.gray.base};
  }
`

interface ProfileEmptyMessageProps {
  isMine: boolean
  isGroupIOwn: boolean
  identifiable: EmptyProfile
}

export const ProfileEmptyMessage: React.FC<ProfileEmptyMessageProps> = ({
  isMine,
  identifiable,
  isGroupIOwn,
}) => {
  const openNewChannelModal = useCallback(() => {
    const newChannelProps = identifiable.__typename === 'Group' && {
      group_id: identifiable.id,
      authorType: 'GROUP',
      visibility: 'PRIVATE',
    }

    const modal = new Modal(NewChannelForm, newChannelProps)
    modal.open()
  }, [])

  const openManageGroupModal = useCallback(e => {
    e.preventDefault()
    const { id } = identifiable

    new Modal(ManageGroup, { id, initialSection: 'invite' }).open()
  }, [])

  const isGroup = identifiable.__typename === 'Group'

  const params = useSearchParams()
  const filter = params.get('filter')
  const isOwn = filter === 'OWN' || !filter

  return (
    <Copy
      f={[6, 6, 8]}
      mt={7}
      mb={6}
      color="gray.medium"
      lineHeight={[2, 2, 2]}
    >
      {/* Profile is the current user's */}
      {isMine && !isGroup && (
        <div>
          <Box
            dangerouslySetInnerHTML={{
              __html: isOwn
                ? 'Your profile doesn&#39;t have any content yet.'
                : 'You aren&#39;t a collaborator on anyone else&#39;s channels yet.',
            }}
          />
          {isOwn && (
            <Button
              f={[3, 3, 5]}
              mt={6}
              onClick={openNewChannelModal}
              color="gray.bold"
            >
              Create a channel
            </Button>
          )}
        </div>
      )}

      {/* Profile is the current user's group */}
      {isMine && isGroup && (
        <div>
          <Box>This is your group&#39;s profile.</Box>
          <Box mt={5}>
            Your group will stay secret until you create a publicly visible
            channel.
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Button
              f={[3, 3, 5]}
              mt={7}
              onClick={openNewChannelModal}
              color="gray.bold"
              bg="background"
            >
              Create a group channel
            </Button>

            {isGroupIOwn && (
              <Button
                f={[3, 3, 5]}
                mt={3}
                onClick={openManageGroupModal}
                color="gray.bold"
                bg="background"
              >
                Invite new members
              </Button>
            )}
          </Box>
        </div>
      )}

      {/* Profile is not associated with the current user */}
      {!isMine && identifiable.__typename == 'User' && (
        <div>
          <Box
            dangerouslySetInnerHTML={{
              __html: isOwn
                ? `${identifiable.name} doesn&#39;t have any public content yet.`
                : `${identifiable.name} is not collaborating with anyone yet.`,
            }}
          />
          <Box mt={5}>Follow them to get updates in your feed.</Box>
        </div>
      )}
    </Copy>
  )
}

export default ProfileEmptyMessage
