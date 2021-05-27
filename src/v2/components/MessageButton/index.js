import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { graphql } from '@apollo/client/react/hoc'

import createUserMessageChannelMutation from 'v2/components/MessageButton/mutations/createUserMessageChannel'

class MessageButton extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    createUserMessageChannel: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  handleClick = () => {
    const { id, createUserMessageChannel } = this.props

    this.setState({ mode: 'working' })

    return createUserMessageChannel({ variables: { id } })
      .then(
        ({
          data: {
            create_user_message_channel: {
              channel: { href },
            },
          },
        }) => {
          this.setState({ mode: 'redirecting' })
          window.location.href = href
        }
      )
      .catch(() => this.setState({ mode: 'error' }))
  }

  render() {
    const { mode } = this.state
    const {
      id: _id,
      createUserMessageChannel: _createUserMessageChannel,
      createUserMessageChannelResult,
      children,
      ...rest
    } = this.props

    return (
      <span onClick={this.handleClick} role="button" tabIndex={0} {...rest}>
        {children({ mode })}
      </span>
    )
  }
}

export default graphql(createUserMessageChannelMutation, {
  name: 'createUserMessageChannel',
})(MessageButton)
