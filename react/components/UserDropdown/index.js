import React, { Component } from 'react';
import styled from 'styled-components';

import BorderedBox from 'react/components/UI/BorderedBox';
import Box from 'react/components/UI/Box';
import Link from 'react/components/UserDropdown/components/Link';
import Label from 'react/components/UserDropdown/components/Label';
import SecondaryLinks from 'react/components/UserDropdown/components/SecondaryLinks';

const Section = styled(Box).attrs({
  py: 3,
  borderBottom: '1px solid',
  borderColor: 'gray.semiLight',
})`
  &:last-child {
    border-bottom: 0;
  }
`;

export default class UserDropdown extends Component {
  render() {
    return (
      <BorderedBox width="22em">
        <Section>
          <Link href="/profile">
            User Name
            <Label>Profile</Label>
          </Link>
        </Section>

        <Section>
          <Link href="/feed">
            Feed
          </Link>

          <Link href="/explore">
            Explore
          </Link>
        </Section>

        <Section>
          <SecondaryLinks />
        </Section>
      </BorderedBox>
    );
  }
}
