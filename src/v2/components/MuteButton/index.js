import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql, compose, Query } from 'react-apollo';

import muteQuery from 'v2/components/MuteButton/queries/muted';
import muteMutation from 'v2/components/MuteButton/mutations/mute';
import unmuteMutation from 'v2/components/MuteButton/mutations/unmute';

class MuteButton extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.oneOf(['BLOCK', 'CHANNEL']).isRequired,
    mute: PropTypes.func.isRequired,
    unmute: PropTypes.func.isRequired,
    children: PropTypes.func,
  }

  static defaultProps = {
    children: ({ isMuted }) => ({
      true: 'Unmute',
      false: 'Mute',
    }[isMuted]),
  }

  toggleMute = mutable => async () => {
    const { id, type } = this.props;

    const action = mutable.is_muted ? 'unmute' : 'mute';
    const mutation = this.props[action];
    const options = {
      variables: { id, type },
      optimisticResponse: {
        __typename: 'Mutation',
        [action]: {
          __typename: 'MutePayload',
          mutable: {
            ...mutable,
            is_muted: !mutable.is_muted,
          },
        },
      },
    };

    return mutation(options);
  }

  render() {
    const {
      id,
      type,
      children,
      mute: _mute,
      unmute: _unmute,
      ...rest
    } = this.props;

    return (
      <Query query={muteQuery} variables={{ id, type }} ssr={false}>
        {({ loading, error, data }) => {
          if (loading || error) {
            return (
              <span {...rest}>
                Mute
              </span>
            );
          }

          const { mutable } = data;

          return (
            <span onClick={this.toggleMute(mutable)} role="button" tabIndex={0} {...rest}>
              {children({ isMuted: mutable.is_muted })}
            </span>
          );
        }}
      </Query>
    );
  }
}

export default compose(
  graphql(muteMutation, { name: 'mute' }),
  graphql(unmuteMutation, { name: 'unmute' }),
)(MuteButton);
