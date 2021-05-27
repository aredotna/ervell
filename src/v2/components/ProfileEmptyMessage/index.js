import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import styled from 'styled-components'

import emptyProfileFragment from 'v2/components/ProfileEmptyMessage/fragments/indentifiable'

import Text from 'v2/components/UI/Text'
import Box from 'v2/components/UI/Box'
import Modal from 'v2/components/UI/Modal'
import { GenericButton as Button } from 'v2/components/UI/GenericButton'
import NewChannelForm from 'v2/components/NewChannelForm'
import ManageGroup from 'v2/components/ManageGroup'

const Copy = styled(Text)`
  text-align: center;
  a {
    font-weight: bold;
  }
  a:hover {
    color: ${x => x.theme.colors.gray.base};
  }
`

export default class ProfileEmptyMessage extends Component {
  static propTypes = {
    isMine: PropTypes.bool,
    isGroupIOwn: PropTypes.bool,
    identifiable: propType(emptyProfileFragment).isRequired,
  }

  static defaultProps = {
    isMine: false,
  }

  openNewChannelModal = () => {
    const { identifiable } = this.props

    const newChannelProps = identifiable.__typename === 'Group' && {
      group_id: identifiable.id,
      authorType: 'GROUP',
      visibility: 'PRIVATE',
    }

    const modal = new Modal(NewChannelForm, newChannelProps)
    modal.open()
  }

  openManageGroupModal = e => {
    e.preventDefault()

    const {
      identifiable: { id },
    } = this.props

    new Modal(ManageGroup, { id, initialSection: 'invite' }).open()
  }

  render() {
    const { isMine, identifiable, isGroupIOwn } = this.props
    const isGroup = identifiable.__typename === 'Group'

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
            <Box>You profile doesn&#39;t have any content yet.</Box>
            <Button
              f={[3, 3, 5]}
              mt={6}
              onClick={this.openNewChannelModal}
              color="gray.bold"
            >
              Create a channel
            </Button>
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
                onClick={this.openNewChannelModal}
                color="gray.bold"
                bg="background"
              >
                Create a group channel
              </Button>

              {isGroupIOwn && (
                <Button
                  f={[3, 3, 5]}
                  mt={3}
                  onClick={this.openManageGroupModal}
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
        {!isMine && (
          <div>
            <Box>
              {identifiable.name} doesn&#39;t have any public content yet.
            </Box>
            <Box mt={5}>
              Follow them to get an update in your feed when they add something.
            </Box>
          </div>
        )}
      </Copy>
    )
  }
}
