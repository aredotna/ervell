import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import chunk from 'react/util/chunk';

import channelContentsFragment from 'react/components/ChannelContents/fragments/channelContents';

import Grid from 'react/components/UI/Grid';
import GridItem from 'react/components/UI/Grid/components/GridItem';
import AddBlock from 'react/components/AddBlock';
import ChannelContentsPage from 'react/components/ChannelContents/components/ChannelContentsPage';
import ChannelContentsAppended from 'react/components/ChannelContents/components/ChannelContentsAppended';

export default class ChannelContents extends PureComponent {
  static propTypes = {
    chunkSize: PropTypes.number,
    channel: propType(channelContentsFragment).isRequired,
  }

  static defaultProps = {
    chunkSize: 10,
  }

  state = {
    pendingSkeleton: [],
  }

  handleAddBlock = ({ id }) => {
    this.setState(prevState => ({
      pendingSkeleton: [{ id, type: 'BLOCK' }, ...prevState.pendingSkeleton],
    }));
  }

  render() {
    const { pendingSkeleton } = this.state;
    const {
      channel: { id, skeleton, can },
      chunkSize,
      ...rest
    } = this.props;

    const chunked = chunk(skeleton, chunkSize);

    return (
      <Grid wrapChildren={false} {...rest}>
        {can.add_to &&
          <React.Fragment>
            <GridItem>
              <AddBlock
                channel_id={id}
                onAddBlock={this.handleAddBlock}
              />
            </GridItem>
          </React.Fragment>
        }

        <ChannelContentsAppended
          id={id}
          pendingSkeleton={pendingSkeleton}
        />

        {chunked.map((pageSkeleton, idx) => (
          <ChannelContentsPage
            key={`Page:${idx + 1}`}
            id={id}
            skeleton={pageSkeleton}
            context={skeleton}
          />
        ))}
      </Grid>
    );
  }
}
