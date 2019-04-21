import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import StickyBreadcrumbPath from 'v2/components/UI/StickyBreadcrumbPath';
import WithCurrentRoute from 'v2/hocs/WithCurrentRoute';

const Options = styled.div`
`;

const Option = styled(Link)`
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
    <Option to="/explore">Explore</Option>
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
            '/notifications': 'Notifications',
          }[pathname]}
        </StickyBreadcrumbPath.Crumb>
      </StickyBreadcrumbPath>
    );
  }
}

export default WithCurrentRoute(FeedBreadcrumb);
