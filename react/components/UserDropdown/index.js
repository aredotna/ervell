import React, { Component } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';

import userDropdownQuery from 'react/components/UserDropdown/queries/userDropdown';

import BorderedBox from 'react/components/UI/BorderedBox';
import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import Link from 'react/components/UserDropdown/components/Link';
import Label from 'react/components/UserDropdown/components/Label';
import SecondaryLinks from 'react/components/UserDropdown/components/SecondaryLinks';
import MyGroups from 'react/components/UserDropdown/components/MyGroups';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';

const Section = styled(Box).attrs({
  py: 4,
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
      <Query query={userDropdownQuery}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <BorderedBox width="20em">
                <LoadingIndicator p={6} />
              </BorderedBox>
            );
          }

          if (error) {
            return (
              <BorderedBox width="20em">
                <Text color="state.alert" f={2} p={6}>
                  {error.message}
                </Text>
              </BorderedBox>
            );
          }

          const { me } = data;

          return (
            <BorderedBox width="20em">
              <Section>
                <Link py={3} href={me.href}>
                  {me.name}

                  <Label>Profile</Label>
                </Link>
              </Section>

              <Section>
                <MyGroups me={me} />
              </Section>

              <Section>
                <Link pt={3} pb={4} href="/feed">
                  Feed
                </Link>

                <Link pt={4} pb={3} href="/explore">
                  Explore
                </Link>
              </Section>

              <Section>
                <SecondaryLinks isPremium={me.is_premium} />
              </Section>
            </BorderedBox>
          );
        }}
      </Query>
    );
  }
}
