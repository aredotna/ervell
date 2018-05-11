import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const GET_CURRENT_ROUTE_URL = gql`
  query {
    currentRoute @client {
      url
      path
    }
  }
`;


class LinkUnlessCurrent extends Component {
  static propTypes = {
    data: PropTypes.shape({
      currentRoute: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,

    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    predicate: PropTypes.func,
  }

  static defaultProps = {
    predicate: null,
  }

  isCurrent = () => {
    const { predicate, href, data: { currentRoute: { url, path } } } = this.props;

    if (predicate) return predicate({ href, url, path });

    return href === url;
  }

  render() {
    const { href, children, ...rest } = this.props;

    return (
      <a
        {...(!this.isCurrent() && { href })}
        {...rest}
      >
        {children}
      </a>
    );
  }
}

export default graphql(GET_CURRENT_ROUTE_URL)(LinkUnlessCurrent);
