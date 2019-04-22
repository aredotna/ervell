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
`;

export default class MyHeader extends PureComponent {
  static propTypes = {
    me: propType(myHeaderFragment).isRequired,
  }

  render() {
    const { me, ...rest } = this.props;

    return (
      <Header {...rest}>
        <MemberAvatar
          member={me}
          size={80}
          isLinked={false}
          circle
        />

        <Box ml={6}>
          <Text f={6} mb={2} fontWeight="bold">
            {me.name}
          </Text>

          <UpcomingInvoice customer={me.customer} />
        </Box>
      </Header>
    );
  }
}
