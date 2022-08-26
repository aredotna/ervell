import React, { useCallback } from 'react'
import { Link as ClientLink } from 'react-router-dom'

import StandardLink from 'v2/components/UI/Link'
import { useIsOutsideMainRouter } from 'v2/hooks/useIsOutsideMainRouter'
import Text from 'v2/components/UI/Text'

interface AdaptibleLinkProps {
  to: {
    pathname: string
    state: any
  }
  href: string
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

// TODO: *Delete and replace with react-router Link*
// This is a temporary measure to handle cases where components can exist both
// inside and outside the main router.

export const AdaptibleLink: React.FC<AdaptibleLinkProps> = ({
  to,
  href,
  children,
  ...rest
}) => {
  const isOutsideMainRouter = useIsOutsideMainRouter()
  const Link = isOutsideMainRouter ? StandardLink : ClientLink

  const params = isOutsideMainRouter ? href : { to }

  const handleClick = useCallback(
    e => {
      if (isOutsideMainRouter && e.metaKey) {
        window.open(href, '_blank')
        return
      }

      if (isOutsideMainRouter) {
        return (window.location.href = href)
      }

      e.preventDefault()
    },
    [isOutsideMainRouter, href]
  )

  if (href || to) {
    return (
      <Link onMouseDown={handleClick} {...params} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <Text onMouseDown={handleClick} {...rest}>
      {children}
    </Text>
  )
}
