import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';

import MyGroup from 'react/components/Billing/components/MyGroups/components/MyGroup';

import myGroupsFragment from 'react/components/Billing/components/MyGroups/fragments/myGroups';

export default class MyGroups extends PureComponent {
  static propTypes = {
    me: propType(myGroupsFragment).isRequired,
  }

  render() {
    const { me: { groups } } = this.props;

    return (
      <div>
        {groups.map(group => (
          <MyGroup key={group.id} group={group} mb={10} />
        ))}
      </div>
    );
  }
}
