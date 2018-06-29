import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import StickyBreadcrumbPath from 'react/components/UI/StickyBreadcrumbPath';
import WithCurrentRoute from 'react/hocs/WithCurrentRoute';
import WithLoginStatus from 'react/hocs/WithLoginStatus';

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

const ExploreOptions = ({ isLoggedIn }) => (
  <Options>
    <div>Explore</div>

    {isLoggedIn &&
      <Option href="/feed">Feed</Option>
    }
  </Options>
);

ExploreOptions.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

class HomeBreadcrumb extends Component {
  static propTypes = {
    currentRoute: PropTypes.shape({
      href: PropTypes.string.isRequired,
    }).isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }

  render() {
    const { currentRoute: { pathname }, isLoggedIn } = this.props;

    const stuckChildren = (
      <StickyBreadcrumbPath.Crumb>
        {{
          '/': 'Feed',
          '/feed': 'Feed',
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
            '/': FeedOptions,
            '/feed': FeedOptions,
            '/explore': ExploreOptions({ isLoggedIn }),
            '/explore/channels': ExploreOptions({ isLoggedIn }),
            '/explore/blocks': ExploreOptions({ isLoggedIn }),
            '/notifications': 'Notifications',
          }[pathname]}
        </StickyBreadcrumbPath.Crumb>
      </StickyBreadcrumbPath>
    );
  }
}

export default WithLoginStatus(WithCurrentRoute(HomeBreadcrumb));
