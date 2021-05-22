import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import styled from 'styled-components'
import { ApolloConsumer } from '@apollo/client'

import billingQuery from 'v2/components/Billing/queries/billing'

import myGroupHeaderFragment from 'v2/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupHeader/fragments/myGroupHeader'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import ButtonGroup from 'v2/components/UI/ButtonGroup'
import GenericButton from 'v2/components/UI/GenericButton'
import Icons from 'v2/components/UI/Icons'
import MemberAvatar from 'v2/components/MemberAvatar'
import Modal from 'v2/components/UI/Modal/Portal'
import ManageGroup from 'v2/components/ManageGroup'
import CancelPremiumUserSelection from 'v2/components/Billing/components/MyGroups/components/CancelPremiumUserSelection'

const Header = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`

export default class MyGroupHeader extends PureComponent {
  static propTypes = {
    group: propType(myGroupHeaderFragment).isRequired,
    onCanceled: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  openEditModal = e => {
    e.preventDefault()
    this.setState({ mode: 'edit' })
  }

  openCancelModal = e => {
    e.preventDefault()
    this.setState({ mode: 'cancel' })
  }

  closeModal = e => {
    if (e) e.preventDefault()
    this.setState({ mode: 'resting' })
  }

  render() {
    const { mode } = this.state
    const { group, onCanceled, ...rest } = this.props

    return (
      <Header {...rest}>
        <Box display="flex">
          <MemberAvatar member={group} size={80} isLinked={false} circle />

          <Text f={6} ml={6} mb={4} fontWeight="bold">
            {group.name}
          </Text>
        </Box>

        <ButtonGroup f={1}>
          <GenericButton onClick={this.openEditModal}>
            <Icons name="Pencil" size="1rem" mr={4} color="gray.medium" />
            Edit group
          </GenericButton>

          {group.users.some(
            ({ can: { cancel_premium } }) => cancel_premium
          ) && (
            <GenericButton onClick={this.openCancelModal} color="state.alert">
              Cancel upgraded members
            </GenericButton>
          )}
        </ButtonGroup>

        {mode === 'edit' && (
          <Modal onClose={this.closeModal}>
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
                    this.closeModal()
                  }}
                />
              )}
            </ApolloConsumer>
          </Modal>
        )}

        {mode === 'cancel' && (
          <Modal onClose={this.closeModal}>
            <CancelPremiumUserSelection
              group={group}
              onClose={this.closeModal}
              onCanceled={onCanceled}
            />
          </Modal>
        )}
      </Header>
    )
  }
}
