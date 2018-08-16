import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import { graphql, compose } from 'react-apollo';

import WithLoginStatus from 'react/hocs/WithLoginStatus';

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
    isLoggedIn: PropTypes.bool.isRequired,
    followNode: PropTypes.node,
    unfollowNode: PropTypes.node,
  }

  static defaultProps = {
    followNode: 'Follow',
    unfollowNode: 'Unfollow',
  }

  toggleFollow = async () => {
    const {
      id, type, data: { followable }, isLoggedIn,
    } = this.props;

    if (!isLoggedIn) {
      window.location = `/sign_up?redirect-to=${window.location.pathname}`;
    }

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
    const { data: { loading } } = this.props;

    if (loading) return <span>Follow</span>;

    const {
      id,
      type,
      follow: _follow,
      unfollow: _unfollow,
      isLoggedIn: _isLoggedIn,
      data: { followable },
      followNode,
      unfollowNode,
      ...rest
    } = this.props;

    const isFollowed = !!(followable && followable.is_followed);

    return (
      <span onClick={this.toggleFollow} role="button" tabIndex={0} {...rest}>
        {{
          true: followNode,
          false: unfollowNode,
        }[isFollowed]}
      </span>
    );
  }
}

export default WithLoginStatus(compose(
  graphql(followingQuery),
  graphql(followMutation, { name: 'follow' }),
  graphql(unfollowMutation, { name: 'unfollow' }),
)(FollowButton));
