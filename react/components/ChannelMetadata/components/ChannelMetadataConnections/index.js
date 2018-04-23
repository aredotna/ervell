import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';

import LinksList from 'react/components/LinksList';

import channelMetadataConnectionsFragment from 'react/components/ChannelMetadata/components/ChannelMetadataConnections/fragments/channelMetadataConnections';

// import InlineConnectIntegrationView from 'components/connect/integration/inline/view.coffee';

export default class ChannelMetadataConnections extends Component {
  static propTypes = {
    channel: propType(channelMetadataConnectionsFragment).isRequired,
  }

  componentDidMount() {
    // TODO
    // https://reactjs.org/docs/integrating-with-other-libraries.html

    // const view = new InlineConnectIntegrationView({
    //   el: this.connectEl,
    // });

    // view.render();
  }

  render() {
    const { channel } = this.props;

    return (
      <div>
        {channel.connections.length > 0 &&
          <LinksList links={channel.connections} />
        }

        <div ref={(el) => { this.connectEl = el; }} />
      </div>
    );
  }
}
