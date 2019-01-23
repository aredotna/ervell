import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import StickyBreadcrumbPath from 'react/components/UI/StickyBreadcrumbPath';
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

class ExploreBreadcrumb extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  }

  render() {
    const { isLoggedIn } = this.props;

    const stuckChildren = (
      <StickyBreadcrumbPath.Crumb>
        Explore
      </StickyBreadcrumbPath.Crumb>
    );

    return (
      <StickyBreadcrumbPath stuckChildren={stuckChildren}>
        <StickyBreadcrumbPath.Crumb>
          <Options>
            <div>Explore</div>

            {isLoggedIn &&
              <Option href="/feed">Feed</Option>
            }
          </Options>
        </StickyBreadcrumbPath.Crumb>
      </StickyBreadcrumbPath>
    );
  }
}

export default WithLoginStatus(ExploreBreadcrumb);
