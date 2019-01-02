import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import myHeaderFragment from 'react/components/Billing/components/MyHeader/fragments/myHeader';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import MemberAvatar from 'react/components/MemberAvatar';
import UpcomingInvoice from 'react/components/Billing/components/UpcomingInvoice';

const Header = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export default class MyHeader extends PureComponent {
  static propTypes = {
    me: propType(myHeaderFragment).isRequired,
  }

  render() {
    const { me, ...rest } = this.props;

    return (
      <Header {...rest}>
        <div>
          <Text f={6} mb={4}>
            <strong>
              {me.name}
            </strong>
          </Text>

          <UpcomingInvoice customer={me.customer} />
        </div>

        <MemberAvatar
          member={me}
          size={80}
          isLinked={false}
          circle
        />
      </Header>
    );
  }
}
