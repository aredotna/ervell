import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Query } from '@apollo/client/react/components'

import channelContextQuery from 'v2/components/ModalBlockLightboxWithChannelContext/queries/channelContext'

import Modal from 'v2/components/UI/Modal/Portal'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import ModalFullscreenDialog from 'v2/components/UI/ModalFullscreenDialog'
import ModalBlockLightbox from 'v2/components/ModalBlockLightbox'

export default class ModalBlockLightboxWithChannelContext extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    channel_id: PropTypes.number.isRequired,
    documentTitle: PropTypes.string,
  }

  static defaultProps = {
    documentTitle: document.title,
  }

  state = {
    mode: 'open',
  }

  close = () => {
    this.setState({ mode: 'closed' })
    document.title = this.props.documentTitle
  }

  render() {
    const { id, channel_id } = this.props
    const { mode } = this.state

    if (mode !== 'open') return null

    return (
      <Modal onClose={this.close} Dialog={ModalFullscreenDialog}>
        <Query query={channelContextQuery} variables={{ id: channel_id }}>
          {({ data, loading, error }) => {
            if (loading) return <LoadingIndicator />

            let ids = []

            if (error) {
              // Log the error but attempt to open the lightbox anyway
              console.error(error)
            }

            ids = data && data.channel.skeleton.map(k => k.id)

            return <ModalBlockLightbox id={id} ids={ids} onClose={this.close} />
          }}
        </Query>
      </Modal>
    )
  }
}
