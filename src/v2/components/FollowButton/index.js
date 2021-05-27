import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import { graphql } from '@apollo/client/react/hoc'
import compose from 'lodash.flowright'

import WithLoginStatus from 'v2/hocs/WithLoginStatus'

import followingQuery from 'v2/components/FollowButton/queries/following'
import followableFragment from 'v2/components/FollowButton/fragments/followable'
import followMutation from 'v2/components/FollowButton/mutations/follow'
import unfollowMutation from 'v2/components/FollowButton/mutations/unfollow'

class FollowButton extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.oneOf(['USER', 'GROUP', 'CHANNEL']).isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      followable: propType(followableFragment),
    }).isRequired,
    follow: PropTypes.func.isRequired,
    unfollow: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    children: PropTypes.func,
  }

  static defaultProps = {
    children: ({ isFollowed }) =>
      ({ true: 'Unfollow', false: 'Follow' }[isFollowed]),
  }

  toggleFollow = async e => {
    e.preventDefault()

    const {
      id,
      type,
      data: { followable },
      isLoggedIn,
    } = this.props

    if (!isLoggedIn) {
      window.location = `/sign_up?redirect-to=${window.location.pathname}`
      return null
    }

    const action = followable.is_followed ? 'unfollow' : 'follow'
    const mutation = this.props[action]
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
    }

    return mutation(options)
  }

  render() {
    const {
      id,
      type,
      follow: _follow,
      unfollow: _unfollow,
      isLoggedIn: _isLoggedIn,
      followResult,
      unfollowResult,
      children,
      data,
      ...rest
    } = this.props

    if (data.loading) {
      return <span {...rest}>—</span>
    }

    const isFollowed = !!(data.followable && data.followable.is_followed)

    return (
      <span onClick={this.toggleFollow} role="button" tabIndex={0} {...rest}>
        {children({ isFollowed })}
      </span>
    )
  }
}

export default WithLoginStatus(
  compose(
    graphql(followingQuery),
    graphql(followMutation, { name: 'follow' }),
    graphql(unfollowMutation, { name: 'unfollow' })
  )(FollowButton)
)
