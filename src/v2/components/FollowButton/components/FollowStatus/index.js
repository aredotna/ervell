import React from 'react'
import PropTypes from 'prop-types'

const FollowStatus = ({ is_followed }) => (
  <span>
    {
      {
        false: 'Follow',
        true: 'Unfollow',
      }[is_followed]
    }
  </span>
)

FollowStatus.propTypes = {
  is_followed: PropTypes.bool.isRequired,
}

export default FollowStatus
