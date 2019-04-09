import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import { Query } from 'react-apollo';

import channelContentsPageQuery from 'react/components/ChannelContents/components/ChannelContentsPage/queries/channelContentsPage';

import Cell from 'react/components/Cell';
import GridItem from 'react/components/UI/Grid/components/GridItem';
import ChannelContentsPageSkeleton from 'react/components/ChannelContents/components/ChannelContentsPageSkeleton';

export default class ChannelContentsPage extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    page: PropTypes.number.isRequired,
    per: PropTypes.number.isRequired,
    skeleton: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      type: PropTypes.string.isRequired,
    })).isRequired,
    context: PropTypes.arrayOf(PropTypes.shape({
      __typename: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })),
  }

  static defaultProps = {
    context: [],
  }

  state = {
    mode: 'resting',
  }

  handleEnter = () =>
    this.setState({ mode: 'active' });

  render() {
    const { mode } = this.state;
    const {
      id,
      page,
      per,
      skeleton,
    } = this.props;

    return (
      <React.Fragment>
        {mode === 'resting' &&
          <Waypoint onEnter={this.handleEnter} />
        }

        {mode !== 'active' &&
          <ChannelContentsPageSkeleton
            skeleton={skeleton}
            mode="pending"
          />
        }

        {mode === 'active' &&
          <Query query={channelContentsPageQuery} variables={{ id, page, per }}>
            {({ data, loading, error }) => {
              if (loading) {
                return (
                  <ChannelContentsPageSkeleton
                    skeleton={skeleton}
                    mode="loading"
                  />
                );
              }

              if (error) {
                return (
                  <ChannelContentsPageSkeleton
                    skeleton={skeleton}
                    mode="error"
                  />
                );
              }

              const { context } = this.props;
              const { channel: { contents } } = data;

              return contents.map(connectable => (
                <GridItem key={`${connectable.__typename}:${connectable.id}`}>
                  <Cell.Konnectable
                    konnectable={connectable}
                    context={context}
                  />
                </GridItem>
              ));
            }}
          </Query>
        }

        {mode === 'resting' &&
          <Waypoint onEnter={this.handleEnter} />
        }
      </React.Fragment>
    );
  }
}
