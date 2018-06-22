import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import { graphql, compose } from 'react-apollo';

import muteQuery from 'react/components/MuteButton/queries/muted';
import mutableFragment from 'react/components/MuteButton/fragments/mutable';
import muteMutation from 'react/components/MuteButton/mutations/mute';
import unmuteMutation from 'react/components/MuteButton/mutations/unmute';

class MuteButton extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.oneOf(['CONNECTABLE', 'CHANNEL']).isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      mutable: propType(mutableFragment),
    }).isRequired,
    mute: PropTypes.func.isRequired,
    unmute: PropTypes.func.isRequired,
  }

  toggleMute = async () => {
    const {
      id, type, data: { mutable },
    } = this.props;

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
    const { data: { loading } } = this.props;

    console.log('data', this.props);

    if (loading) return <span>Mute</span>;

    const {
      id, type, mute: _mute, unmute: _unmute,
      data: { mutable },
      ...rest
    } = this.props;

    return (
      <span onClick={this.toggleMute} role="button" tabIndex={0} {...rest}>
        {{
          true: 'Unmute',
          false: 'Mute',
        }[mutable.is_muted]}
      </span>
    );
  }
}

export default compose(
  graphql(muteQuery),
  graphql(muteMutation, { name: 'mute' }),
  graphql(unmuteMutation, { name: 'unmute' }),
)(MuteButton);
