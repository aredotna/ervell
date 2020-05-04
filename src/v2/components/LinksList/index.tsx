import React from 'react'
import styled from 'styled-components'
import { Link as RouterLink, LinkProps } from 'react-router-dom'

const Container = styled.div``

const Link = styled(RouterLink)`
  font-weight: bold;
  cursor: pointer;
`

interface Link extends LinkProps {
  label: string
}

interface LinksListProps {
  links: Link[]
}

export const LinksList: React.FC<LinksListProps> = ({ links, ...rest }) => {
  return (
    <Container {...rest}>
      {links.map((link, i) => {
        const toParams = link.href ? link.href : link
        return (
          <span key={link.id}>
            <Link
              to={toParams}
              length={link.label.length}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />

            {i !== links.length - 1 && ', '}
            {i === links.length - 2 && 'and '}
          </span>
        )
      })}
    </Container>
  )
}
