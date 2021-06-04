import React, { Component } from 'react'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import styled from 'styled-components'

import Modal from 'v2/components/UI/Modal'
import Icons from 'v2/components/UI/Icons'
import ManageChannel from 'v2/components/ManageChannel'
import Button, { mixin as buttonMixin } from 'v2/components/UI/GenericButton'
import ButtonGroup from 'v2/components/UI/ButtonGroup'
import FollowButton from 'v2/components/FollowButton'
import MuteChannelButton from 'v2/components/ChannelMetadata/components/ChannelMetadataActions/components/MuteChannelButton'

import channelMetadataActionsFragment from 'v2/components/ChannelMetadata/components/ChannelMetadataActions/fragments/channelMetadataActions'

const ChannelFollowButton = styled(FollowButton)`
  ${buttonMixin}
`

export default class ChannelMetadataActions extends Component {
  static propTypes = {
    channel: propType(channelMetadataActionsFragment).isRequired,
  }

  openEditChannel = () => {
    const {
      channel: { id },
    } = this.props

    const onUpdate = href => {
      window.location = href
    }

    const modal = new Modal(ManageChannel, { id, onUpdate })
    modal.open()
  }

  render() {
    const {
      channel,
      channel: { id, can },
    } = this.props

    return (
      <ButtonGroup f={1}>
        {can.follow && (
          <ChannelFollowButton id={id} type="CHANNEL">
            {({ isFollowed }) =>
              ({
                true: (
                  <React.Fragment>
                    <Icons
                      name="Unfollow"
                      size="1rem"
                      mr={4}
                      color="gray.medium"
                    />
                    Unfollow
                  </React.Fragment>
                ),
                false: (
                  <React.Fragment>
                    <Icons
                      name="Follow"
                      size="1rem"
                      mr={4}
                      color="gray.medium"
                    />
                    Follow
                  </React.Fragment>
                ),
              }[isFollowed])
            }
          </ChannelFollowButton>
        )}

        {can.mute && <MuteChannelButton channel={channel} />}

        {(can.update || can.destroy) && (
          <Button onClick={this.openEditChannel}>
            <Icons name="Pencil" size="1rem" mr={4} color="gray.medium" />
            Edit channel
          </Button>
        )}
      </ButtonGroup>
    )
  }
}
