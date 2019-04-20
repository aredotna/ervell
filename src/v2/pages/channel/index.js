import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import channelPageQuery from 'v2/pages/channel/queries/channelPage';

import Constrain from 'v2/components/UI/Constrain';
import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout';
import LoadingIndicator from 'v2/components/UI/LoadingIndicator';
import ErrorAlert from 'v2/components/UI/ErrorAlert';
import ChannelMetadata from 'v2/components/ChannelMetadata';
import ChannelContents from 'v2/components/ChannelContents';

export default class ChannelPage extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  render() {
    const { id } = this.props;

    return (
      <TopBarLayout>
        <Constrain>
          <Query query={channelPageQuery} variables={{ id }}>
            {({ data, loading, error }) => {
              if (loading) {
                return <LoadingIndicator />;
              }

              if (error) {
                return <ErrorAlert>{error.message}</ErrorAlert>;
              }

              const { channel } = data;

              return (
                <React.Fragment>
                  <ChannelMetadata channel={channel} />

                  <ChannelContents channel={channel} />
                </React.Fragment>
              );
            }}
          </Query>
        </Constrain>
      </TopBarLayout>
    );
  }
}
