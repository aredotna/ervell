import React, { Component } from 'react'
import { graphql } from '@apollo/client/react/hoc'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import cancelChannelTransferMutation from 'v2/components/ManageChannel/components/TransferChannel/components/CancelTransferButton/mutations/cancelTransfer'

const Button = styled.a.attrs({
  role: 'button',
  tabIndex: 0,
})`
  display: block;
  margin-top: 0.5em;
  font-weight: bold;
`

class CancelTransferButton extends Component {
  static propTypes = {
    channel_id: PropTypes.string.isRequired,
    cancelChannelTransfer: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  handleClick = () => {
    const { channel_id, cancelChannelTransfer } = this.props

    this.setState({ mode: 'cancelling' })

    return cancelChannelTransfer({
      variables: { channel_id },
    }).catch(err => {
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
            resting: 'Cancel transfer',
            cancelling: 'Cancelling...',
            error: 'An error occurred.',
          }[mode]
        }
      </Button>
    )
  }
}

export default graphql(cancelChannelTransferMutation, {
  name: 'cancelChannelTransfer',
})(CancelTransferButton)
