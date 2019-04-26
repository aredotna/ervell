import React from 'react'
import PropTypes from 'prop-types'

import Text from 'v2/components/UI/Text'
import { truncate } from 'v2/components/UI/Truncate'
import BorderedLock from 'v2/components/UI/BorderedLock'

const NotificationObjectLink = ({
  __typename,
  label,
  href,
  visibility,
  is_me,
  ...rest
}) => {
  if (is_me) {
    return (
      <Text display="inline" f={1}>
        you
      </Text>
    )
  }

  return (
    <Text
      display="inline"
      f={1}
      fontWeight="bold"
      color={__typename === 'Channel' ? `channel.${visibility}` : 'gray.base'}
      {...rest}
    >
      <a href={href}>
        <span dangerouslySetInnerHTML={{ __html: truncate(label, 40) }} />

        {visibility === 'private' && (
          <React.Fragment>
            <BorderedLock ml={3} />
          </React.Fragment>
        )}
      </a>
    </Text>
  )
}

NotificationObjectLink.propTypes = {
  __typename: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  visibility: PropTypes.string,
  body: PropTypes.string,
  is_me: PropTypes.bool,
}

NotificationObjectLink.defaultProps = {
  visibility: null,
  body: null,
  is_me: false,
}

export default NotificationObjectLink
