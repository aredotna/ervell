import React, { PureComponent } from 'react';
import Waypoint from 'react-waypoint';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { withApollo } from 'react-apollo';

import channelContentsFragment from 'react/components/ChannelContents/fragments/channelContents';
import channelContentsQuery from 'react/components/ChannelContents/queries/channelContents';

import Grid from 'react/components/UI/Grid';
import Cell from 'react/components/Cell';

class ChannelContents extends PureComponent {
  static propTypes = {
    per: PropTypes.number,
    channel: propType(channelContentsFragment).isRequired,
  }

  static defaultProps = {
    per: 8,
  }

  state = {
    activated: [],
    contents: {},
  }

  handleEnter = page => () => {
    this.setState(prevState => ({
      activated: [...prevState.activated, page],
    }));

    const { channel: { id }, client, per } = this.props;

    client.query({
      query: channelContentsQuery,
      variables: { id, per, page },
    })
      .then(({ data: { channel: { contents } } }) => this.appendContents(contents))
      .catch(err => console.error(err));
  }

  appendContents = (contents) => {
    const indexed = contents.reduce((memo, connectable) => {
      memo[connectable.id] = connectable;
      return memo;
    }, {});

    this.setState(prevState => ({
      contents: {
        ...prevState.contents,
        ...indexed,
      },
    }));
  }

  render() {
    const { activated, contents } = this.state;
    const { channel, per, ...rest } = this.props;

    return (
      <Grid {...rest}>
        {channel.skeleton.map(({ id, type }, idx) => {
          const page = Math.floor(idx / per) + 1;
          const isActivated = activated.includes(page);
          const connectable = contents[id];

          return (
            <React.Fragment key={`${type}:${id}`}>
              {!isActivated && idx % per === 0 &&
                <Waypoint bottomOffset="-100%" onEnter={this.handleEnter(page)} />
              }

              <Cell.Skeletal
                mode={
                  connectable ? 'active' : (
                    isActivated ? 'loading' : 'pending'
                  )
                }
                konnectable={connectable}
                context={channel.skeleton}
                border="1px solid"
                borderColor="gray.light"
                p={6}
              />
            </React.Fragment>
          );
        })}
      </Grid>
    );
  }
}

export default withApollo(ChannelContents);
