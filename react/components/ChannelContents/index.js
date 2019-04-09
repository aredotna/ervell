import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import chunk from 'react/util/chunk';

import channelContentsFragment from 'react/components/ChannelContents/fragments/channelContents';

import Grid from 'react/components/UI/Grid';
import ChannelContentsPage from 'react/components/ChannelContents/components/ChannelContentsPage';

export default class ChannelContents extends PureComponent {
  static propTypes = {
    per: PropTypes.number,
    channel: propType(channelContentsFragment).isRequired,
  }

  static defaultProps = {
    per: 8,
  }

  render() {
    const { channel, per, ...rest } = this.props;
    const paged = chunk(channel.skeleton, per);

    return (
      <Grid wrapChildren={false} {...rest}>
        {paged.map((pageSkeleton, idx) => (
          <ChannelContentsPage
            key={`Page:${idx + 1}`}
            id={channel.id}
            page={idx + 1}
            per={per}
            skeleton={pageSkeleton}
            context={channel.skeleton}
          />
        ))}
      </Grid>
    );
  }
}
