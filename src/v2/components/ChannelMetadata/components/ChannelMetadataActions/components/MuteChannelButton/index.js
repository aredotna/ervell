import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import { graphql } from '@apollo/client/react/hoc'
import compose from 'lodash.flowright'

import GenericButton from 'v2/components/UI/GenericButton'
import Icons from 'v2/components/UI/Icons'

import muteChannelButtonFragment from 'v2/components/ChannelMetadata/components/ChannelMetadataActions/components/MuteChannelButton/fragments/muteChannelButton'
import muteChannelMutation from 'v2/components/ChannelMetadata/components/ChannelMetadataActions/components/MuteChannelButton/mutations/muteChannel'
import unmuteChannelMutation from 'v2/components/ChannelMetadata/components/ChannelMetadataActions/components/MuteChannelButton/mutations/unmuteChannel'

class MuteChannelButton extends Component {
  static propTypes = {
    channel: propType(muteChannelButtonFragment).isRequired,
    mute_channel: PropTypes.func.isRequired,
    unmute_channel: PropTypes.func.isRequired,
  }

  toggleMute = async () => {
    const { channel } = this.props

    const action = channel.is_muted ? 'unmute_channel' : 'mute_channel'
    const mutation = this.props[action]
    const options = {
      variables: { id: channel.id },
      optimisticResponse: {
        __typename: 'Mutation',
        [action]: {
          __typename: 'MuteChannelPayload',
          channel: {
            ...channel,
            is_muted: !channel.is_muted,
          },
        },
      },
    }

    return mutation(options)
  }

  render() {
    const {
      mute_channel: _muteChannel,
      unmute_channel: _unmuteChannel,
      channel: { is_muted },
      ...rest
    } = this.props

    const actionName = { true: 'Unmute', false: 'Mute' }[is_muted]

    return (
      <GenericButton onClick={this.toggleMute} {...rest}>
        <Icons name={actionName} size="1rem" mr={4} color="gray.medium" />
        {actionName}
      </GenericButton>
    )
  }
}

export default compose(
  graphql(muteChannelMutation, { name: 'mute_channel' }),
  graphql(unmuteChannelMutation, { name: 'unmute_channel' })
)(MuteChannelButton)
