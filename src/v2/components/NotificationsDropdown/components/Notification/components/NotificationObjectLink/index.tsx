import React from 'react'
import { Link } from 'react-router-dom'

import Text from 'v2/components/UI/Text'
import { truncate } from 'v2/components/UI/Truncate'
import BorderedLock from 'v2/components/UI/BorderedLock'

import { NotificationObject } from '__generated__/NotificationObject'
import { getBreadcrumbPath } from 'v2/util/getBreadcrumbPath'

interface NotificationObjectLinkProps {
  obj: NotificationObject
  label?: string
}

const NotificationObjectLink: React.FC<NotificationObjectLinkProps> = ({
  label,
  obj,
  ...rest
}) => {
  const __typename = obj && obj?.__typename
  const href = obj?.href
  const visibility = obj?.__typename === 'Channel' && obj.visibility
  const title = label ? label : obj.__typename !== 'Comment' && obj?.label

  const is_me = obj && obj.__typename === 'User' && obj.is_me

  if (is_me) {
    return (
      <Text display="inline" f={1}>
        you
      </Text>
    )
  }

  const toParams = obj && {
    pathname: href,
    state:
      obj &&
      (obj?.__typename == 'Channel' || obj?.__typename == 'User') &&
      getBreadcrumbPath(obj),
  }

  return (
    <Text
      display="inline"
      f={1}
      fontWeight="bold"
      color={__typename === 'Channel' ? `channel.${visibility}` : 'gray.base'}
      {...rest}
    >
      <Link to={toParams}>
        <span dangerouslySetInnerHTML={{ __html: truncate(title, 40) }} />

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
