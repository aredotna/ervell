import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import StickyBreadcrumbPath from 'react/components/UI/StickyBreadcrumbPath';
import WithCurrentRoute from 'react/hocs/WithCurrentRoute';

const Options = styled.div`
`;

const Option = styled.a`
  display: block;

  &:last-child:not(first-child) {
    color: ${x => x.theme.colors.gray.regular};

    &:hover {
      color: ${x => x.theme.colors.gray.semiBold};
    }
  }
`;

const FeedOptions = (
  <Options>
    <div>Feed</div>
    <Option href="/explore">Explore</Option>
  </Options>
);

class FeedBreadcrumb extends Component {
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
          '/feed': 'Feed',
          '/newfeed': 'Feed',
          '/notifications': 'Notifications',
        }[pathname]}
      </StickyBreadcrumbPath.Crumb>
    );

    return (
      <StickyBreadcrumbPath stuckChildren={stuckChildren}>
        <StickyBreadcrumbPath.Crumb>
          {{
            '/': FeedOptions,
            '/feed': FeedOptions,
            '/newfeed': FeedOptions,
            '/notifications': 'Notifications',
          }[pathname]}
        </StickyBreadcrumbPath.Crumb>
      </StickyBreadcrumbPath>
    );
  }
}

export default WithCurrentRoute(FeedBreadcrumb);
