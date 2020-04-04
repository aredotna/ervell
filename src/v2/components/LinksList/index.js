import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

const Container = styled.div``

const Link = styled(RouterLink)`
  font-weight: bold;
  ${x => !x.href && 'cursor: default'}
`

export default class LinksList extends Component {
  static defaultProps = {
    links: [],
  }

  static propTypes = {
    links: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.any.isRequired,
        href: PropTypes.string,
        label: PropTypes.string.isRequired,
      })
    ),
  }

  render() {
    const { links, ...rest } = this.props

    return (
      <Container {...rest}>
        {links.map((link, i) => (
          <span key={link.id}>
            <Link
              to={link.href}
              length={link.label.length}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />

            {i !== links.length - 1 && ', '}
            {i === links.length - 2 && 'and '}
          </span>
        ))}
      </Container>
    )
  }
}
