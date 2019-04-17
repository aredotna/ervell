import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import channelContentsSetQuery from 'react/components/ChannelContents/components/ChannelContentsSet/queries/channelContentsSet';

import Cell from 'react/components/Cell';
import GridItem from 'react/components/UI/Grid/components/GridItem';
import ChannelContentsPageSkeleton from 'react/components/ChannelContents/components/ChannelContentsPageSkeleton';

export default class ChannelContentsSet extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
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

  render() {
    const { id, skeleton } = this.props;

    const variables = {
      id,
      connectables: skeleton.map(c =>
        ({ id: c.id, type: c.type.toUpperCase() })),
    };

    return (
      <Query query={channelContentsSetQuery} variables={variables}>
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
    );
  }
}
