import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
`;

const Link = styled.a`
  font-weight: bold;
  ${x => !x.href && 'cursor: default'}
`;

export default class LinksList extends Component {
  static defaultProps = {
    links: [],
  }

  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.any.isRequired,
      href: PropTypes.string,
      label: PropTypes.string.isRequired,
    })),
  }

  render() {
    const { links, ...rest } = this.props;

    return (
      <Container {...rest}>
        {links.map((link, i) => (
          <span key={link.id}>
            <Link href={link.href}>
              {link.label}
            </Link>

            {i !== links.length - 1 && ', '}
            {i === links.length - 2 && 'and '}
          </span>
        ))}
      </Container>
    );
  }
}
