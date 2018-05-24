import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import styles from 'react/styles';

import StickyBreadcrumbPath from 'react/components/UI/StickyBreadcrumbPath';
import WithCurrentRoute from 'react/hocs/WithCurrentRoute';

const Options = styled.div`
`;

const Option = styled.a`
  display: block;

  &:last-child {
    color: ${styles.Colors.gray.regular};

    &:hover {
      color: ${styles.Colors.gray.semiBold};
    }
  }
`;

const feedOptions = (
  <Options>
    <Option>Feed</Option>
    <Option href="/explore">Explore</Option>
  </Options>
);

const exploreOptions = (
  <Options>
    <Option>Explore</Option>
    <Option href="/">Feed</Option>
  </Options>
);

class HomeBreadcrumb extends Component {
  static propTypes = {
    currentRoute: PropTypes.shape({
      href: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { currentRoute: { pathname } } = this.props;

    const stuckChildren = (
      <StickyBreadcrumbPath.Crumb>
        {{
          '/': 'Feed',
          '/explore': 'Explore',
          '/explore/channels': 'Explore',
          '/explore/blocks': 'Explore',
          '/notifications': 'Notifications',
        }[pathname]}
      </StickyBreadcrumbPath.Crumb>
    );

    return (
      <StickyBreadcrumbPath stuckChildren={stuckChildren}>
        <StickyBreadcrumbPath.Crumb>
          {{
            '/': feedOptions,
            '/explore': exploreOptions,
            '/explore/channels': exploreOptions,
            '/explore/blocks': exploreOptions,
            '/notifications': 'Notifications',
          }[pathname]}
        </StickyBreadcrumbPath.Crumb>
      </StickyBreadcrumbPath>
    );
  }
}

export default WithCurrentRoute(HomeBreadcrumb);
