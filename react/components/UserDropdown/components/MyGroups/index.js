import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import { graphql } from 'react-apollo';

import myGroupsFragment from 'react/components/UserDropdown/components/MyGroups/fragments/myGroups';

import toggleMyGroupsDropdownVisibilityMutation from 'react/components/UserDropdown/components/MyGroups/mutations/toggleMyGroupsDropdownVisibility';

import Text from 'react/components/UI/Text';
import GenericButton from 'react/components/UI/GenericButton';
import Link from 'react/components/UserDropdown/components/Link';
import MyGroup from 'react/components/UserDropdown/components/MyGroups/components/MyGroup';
import Modal from 'react/components/UI/Modal';
import CreateGroup from 'react/components/CreateGroup';

const Header = styled(Link)`
  position: relative;
  user-select: none;

  // Left-facing Caret
  &:after {
    display: block;
    content: '';
    position: absolute;
    top: 50%;
    right: 1em;
    width: 0;
    height: 0;
    transform: translateY(-50%);
    border-top: 0.25em solid transparent;
    border-left: 0.25em solid transparent;
    border-bottom: 0.25em solid transparent;
    border-right: 0.5em solid ${props => props.theme.colors.gray.regular};
    pointer-events: none;
  }

  ${props => !props.is_my_groups_dropdown_hidden && `
    &:after {
      border-top: 0.5em solid ${props.theme.colors.gray.regular};
      border-right: 0.25em solid transparent;
      border-bottom: 0;
      border-left: 0.25em solid transparent;
    }
  `}
`;

const BetaBadge = styled(Text).attrs({
  f: 0,
})`
  color: ${x => x.theme.colors.gray.regular} !important;
  display: inline-block;
  font-weight: normal;
  margin-left: 0.5em;
  &:before {
    content: '•';
    margin-right: 0.5em;
  }
`;

const Container = styled.div`
  margin-left: ${x => x.theme.space[3]};
`;

const LearnMoreLink = styled.a`
  font-weight: bold;
`;

class MyGroups extends Component {
  static propTypes = {
    me: propType(myGroupsFragment).isRequired,
    toggleMyGroupsDropdownVisibility: PropTypes.func.isRequired,
  }

  toggle = (e) => {
    e.preventDefault();

    const { toggleMyGroupsDropdownVisibility, me } = this.props;
    const value = !me.is_my_groups_dropdown_hidden;

    return toggleMyGroupsDropdownVisibility({
      variables: {
        flags: [{
          name: 'is_my_groups_dropdown_hidden', value,
        }],
      },
      optimisticResponse: {
        __typename: 'Mutation',
        set_me_flags: {
          __typename: 'SetMeFlagsPayload',
          me: {
            ...me,
            is_my_groups_dropdown_hidden: value,
          },
        },
      },
    });
  }

  openCreateGroup = (e) => {
    e.preventDefault();

    const modal = new Modal(CreateGroup);
    modal.open();
  }

  render() {
    const { me: { groups, is_my_groups_dropdown_hidden } } = this.props;
    const hasGroups = groups.length > 0;

    return (
      <div>
        <Header
          onClick={this.toggle}
          hasGroups={hasGroups}
          is_my_groups_dropdown_hidden={is_my_groups_dropdown_hidden}
        >
          Groups
          <BetaBadge>BETA</BetaBadge>
        </Header>

        {!is_my_groups_dropdown_hidden &&
          <div>
            {groups.length === 0 &&
              <Text f={1} my="1rem" px="1rem" lineHeight={2}>
                Groups are a new way to collaborate on Are.na.
                <br />
                <LearnMoreLink href="/getting-started-with-groups">Learn more</LearnMoreLink>
              </Text>
            }
            {groups.length > 0 &&
              <Container>
                {groups.map(group => (
                  <MyGroup key={`${group.__typename}_${group.id}`} group={group} />
                ))}
              </Container>
            }
            <GenericButton display="block" f={1} mt={5} mb={6} mx="1rem" onClick={this.openCreateGroup}>
              Create group
            </GenericButton>
          </div>
        }
      </div>
    );
  }
}

export default graphql(toggleMyGroupsDropdownVisibilityMutation, {
  name: 'toggleMyGroupsDropdownVisibility',
})(MyGroups);
