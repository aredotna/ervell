import React from 'react'

import Text from 'v2/components/UI/Text'
import { truncate } from 'v2/components/UI/Truncate'
import BorderedLock from 'v2/components/UI/BorderedLock'
import { Link } from 'react-router-dom'

interface NotificationObjectLinkProps {
  __typename: string
  label: string
  href: string
  visibility?: string
  body?: string
  is_me?: boolean
}

const NotificationObjectLink: React.FC<NotificationObjectLinkProps> = ({
  __typename,
  label,
  href,
  visibility = null,
  is_me = false,
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
      <Link to={href}>
        <span dangerouslySetInnerHTML={{ __html: truncate(label, 40) }} />

        {visibility === 'private' && (
          <React.Fragment>
            <BorderedLock ml={3} />
          </React.Fragment>
        )}
      </Link>
    </Text>
  )
}

export default NotificationObjectLink
