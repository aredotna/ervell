import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import channelContextQuery from 'react/components/ModalBlockLightboxWithChannelContext/queries/channelContext';

import Modal from 'react/components/UI/Modal/Portal';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import ModalFullscreenDialog from 'react/components/UI/ModalFullscreenDialog';
import ModalBlockLightbox from 'react/components/ModalBlockLightbox';

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
    this.setState({ mode: 'closed' });
    document.title = this.props.documentTitle;
  }

  render() {
    const { id, channel_id } = this.props;
    const { mode } = this.state;

    if (mode !== 'open') return null;

    return (
      <Modal onClose={this.close} Dialog={ModalFullscreenDialog}>
        <Query query={channelContextQuery} variables={{ id: channel_id }}>
          {({ data, loading, error }) => {
            if (error) {
              console.error(error);
              return null;
            }

            if (loading) return <LoadingIndicator />;

            const ids = data.channel.skeleton.map(k => k.id);

            return (
              <ModalBlockLightbox
                id={id}
                ids={ids}
                onClose={this.close}
              />
            );
          }}
        </Query>
      </Modal>
    );
  }
}
