import React, { useState } from 'react'
import styled from 'styled-components'
import { ApolloConsumer } from '@apollo/client'

import billingQuery from 'v2/components/Billing/queries/billing'

import Box, { BoxProps } from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import ButtonGroup from 'v2/components/UI/ButtonGroup'
import GenericButton from 'v2/components/UI/GenericButton'
import Icons from 'v2/components/UI/Icons'
import MemberAvatar from 'v2/components/MemberAvatar'
import Modal from 'v2/components/UI/Modal/Portal'
import ManageGroup from 'v2/components/ManageGroup'
import CancelPremiumUserSelection from 'v2/components/Billing/components/MyGroups/components/CancelPremiumUserSelection'
import { MyGroupHeader as MyGroupHeaderType } from '__generated__/MyGroupHeader'
import { MyGroupUpcomingInvoices } from '../MyGroupUpcomingInvoices'

const Header = styled(Box)`
  display: flex;
  align-items: flex-start;
`

interface MyGroupHeaderProps {
  group: MyGroupHeaderType
  onCanceled: () => void
}

const MyGroupHeader: React.FC<MyGroupHeaderProps & BoxProps> = ({
  group,
  onCanceled,
  ...rest
}) => {
  const [mode, setMode] = useState<'resting' | 'edit' | 'cancel'>('resting')

  const openEditModal = () => setMode('edit')
  const openCancelModal = () => setMode('cancel')
  const closeModal = () => setMode('resting')

  return (
    <Header {...rest}>
      <Box display="flex" flex={1}>
        <MemberAvatar member={group} size={80} isLinked={false} circle />

        <Box display="flex" flexDirection="column" flex={1} ml={6}>
          <Box display="flex" flexDirection="row">
            <Text f={6} mb={2} fontWeight="bold">
              {group.name}
            </Text>

            <Box ml="auto">
              <ButtonGroup f={1}>
                <GenericButton onClick={openEditModal}>
                  <Icons name="Pencil" size="1rem" mr={4} color="gray.medium" />
                  Edit group
                </GenericButton>

                {group.users.some(
                  ({ can: { cancel_premium } }) => cancel_premium
                ) && (
                  <GenericButton onClick={openCancelModal} color="state.alert">
                    Cancel upgraded members
                  </GenericButton>
                )}
              </ButtonGroup>
            </Box>
          </Box>

          <MyGroupUpcomingInvoices group_id={group.id} />
        </Box>
      </Box>

      {/* */}

      {mode === 'edit' && (
        <Modal onClose={closeModal}>
          <ApolloConsumer>
            {client => (
              <ManageGroup
                id={group.id}
                onClose={() => {
                  // Assume that the member list has changed
                  client.query({
                    query: billingQuery,
                    fetchPolicy: 'network-only',
                  })
                  closeModal()
                }}
              />
            )}
          </ApolloConsumer>
        </Modal>
      )}

      {mode === 'cancel' && (
        <Modal onClose={closeModal}>
          <CancelPremiumUserSelection
            group={group}
            onClose={closeModal}
            onCanceled={onCanceled}
          />
        </Modal>
      )}
    </Header>
  )
}

export default MyGroupHeader
