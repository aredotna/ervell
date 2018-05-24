import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import { graphql, compose } from 'react-apollo';

import followingQuery from 'react/components/FollowButton/queries/following';
import followableFragment from 'react/components/FollowButton/fragments/followable';
import followMutation from 'react/components/FollowButton/mutations/follow';
import unfollowMutation from 'react/components/FollowButton/mutations/unfollow';

class FollowButton extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.oneOf(['USER', 'CHANNEL']).isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      followable: propType(followableFragment),
    }).isRequired,
    follow: PropTypes.func.isRequired,
    unfollow: PropTypes.func.isRequired,
  }

  toggleFollow = async () => {
    const {
      id, type, data: { followable },
    } = this.props;

    const action = followable.is_followed ? 'unfollow' : 'follow';
    const mutation = this.props[action];
    const options = {
      variables: { id, type },
      optimisticResponse: {
        __typename: 'Mutation',
        [action]: {
          __typename: 'FollowPayload',
          followable: {
            ...followable,
            is_followed: !followable.is_followed,
          },
        },
      },
    };

    return mutation(options);
  }

  render() {
    const {
      id, type, follow: _follow, unfollow: _unfollow,
      data: { followable },
      ...rest
    } = this.props;

    return (
      <span onClick={this.toggleFollow} role="button" tabIndex={0} {...rest}>
        {{
          true: 'Unfollow',
          false: 'Follow',
        }[followable.is_followed]}
      </span>
    );
  }
}

export default compose(
  graphql(followingQuery),
  graphql(followMutation, { name: 'follow' }),
  graphql(unfollowMutation, { name: 'unfollow' }),
)(FollowButton);
