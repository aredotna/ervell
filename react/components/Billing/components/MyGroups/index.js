import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';

import StripeContext from 'react/components/StripeContext';
import MyGroup from 'react/components/Billing/components/MyGroups/components/MyGroup';

import myGroupsFragment from 'react/components/Billing/components/MyGroups/fragments/myGroups';

export default class MyGroups extends PureComponent {
  static propTypes = {
    me: propType(myGroupsFragment).isRequired,
  }

  render() {
    const { me, me: { groups } } = this.props;

    return groups.map(group => (
      <StripeContext key={`${group.__typename}_${group.id}`}>
        <MyGroup
          me={me}
          group={group}
          mb={10}
        />
      </StripeContext>
    ));
  }
}
