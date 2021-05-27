import React, { PureComponent } from 'react'
import { graphql } from '@apollo/client/react/hoc'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import GenericButton from 'v2/components/UI/GenericButton'

import initiateChannelTransferMutation from 'v2/components/ManageChannel/components/TransferChannel/components/TransferChannelSearchResults/components/InitiateChannelTransferButton/mutations/initiateChannelTransfer'

import { track, en } from 'lib/analytics.coffee'

const Button = styled(GenericButton).attrs({
  f: 1,
})`
  align-self: center;
`

class InitiateChannelTransferButton extends PureComponent {
  static propTypes = {
    channel_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    owner_id: PropTypes.number.isRequired,
    owner_type: PropTypes.string.isRequired,
    initiateChannelTransfer: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  handleClick = () => {
    const {
      channel_id,
      owner_id,
      owner_type,
      initiateChannelTransfer,
    } = this.props

    this.setState({ mode: 'giving' })

    return initiateChannelTransfer({
      variables: {
        channel_id,
        owner_id,
        owner_type: owner_type.toUpperCase(),
      },
    })
      .then(() =>
        track.submit(en.STARTED_CHANNEL_TRANSFER, {
          channel_id,
          owner_id,
          owner_type,
        })
      )

      .catch(err => {
        console.error(err)
        this.setState({ mode: 'error' })
      })
  }

  render() {
    const { mode } = this.state

    return (
      <Button onClick={this.handleClick}>
        {
          {
            resting: 'Give',
            giving: 'Sending...',
            error: 'An error occurred',
          }[mode]
        }
      </Button>
    )
  }
}

export default graphql(initiateChannelTransferMutation, {
  name: 'initiateChannelTransfer',
})(InitiateChannelTransferButton)
