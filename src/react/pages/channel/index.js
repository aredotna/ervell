import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import channelPageQuery from 'react/pages/channel/queries/channelPage';

import Constrain from 'react/components/UI/Constrain';
import TopBarLayout from 'react/components/UI/Layouts/TopBarLayout';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import ChannelMetadata from 'react/components/ChannelMetadata';
import ChannelContents from 'react/components/ChannelContents';

export default class ChannelPage extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }

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
                return (
                  <ErrorAlert>
                    {error.message}
                  </ErrorAlert>
                );
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
