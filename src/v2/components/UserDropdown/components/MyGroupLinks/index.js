import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import styled from 'styled-components'
import { graphql } from '@apollo/client/react/hoc'

import myGroupLinksFragment from 'v2/components/UserDropdown/components/MyGroupLinks/fragments/myGroupLinks'

import toggleMyGroupsDropdownVisibilityMutation from 'v2/components/UserDropdown/components/MyGroupLinks/mutations/toggleMyGroupsDropdownVisibility'

import { overflowScrolling } from 'v2/styles/mixins'

import Text from 'v2/components/UI/Text'
import GenericButton from 'v2/components/UI/GenericButton'
import Link from 'v2/components/UserDropdown/components/Link'
import MyGroupLink from 'v2/components/UserDropdown/components/MyGroupLinks/components/MyGroupLink'
import Modal from 'v2/components/UI/Modal'
import CreateGroup from 'v2/components/CreateGroup'
import Icons from 'v2/components/UI/Icons'

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

  ${props =>
    !props.is_my_groups_dropdown_hidden &&
    `
    &:after {
      border-top: 0.5em solid ${props.theme.colors.gray.regular};
      border-right: 0.25em solid transparent;
      border-bottom: 0;
      border-left: 0.25em solid transparent;
    }
  `}
`

const BetaBadge = styled(Text).attrs({
  f: 0,
})`
  display: inline-block;
  color: ${props => props.theme.colors.gray.regular} !important;
  font-weight: normal;
  margin-left: 0.5em;

  &:before {
    content: '•';
    margin-right: 0.5em;
  }
`

const Container = styled.div`
  margin-left: ${props => props.theme.space[3]};
  max-height: 30vmin;
  ${overflowScrolling}
`

const LearnMoreLink = styled.a`
  font-weight: bold;
`

class MyGroupLinks extends Component {
  static propTypes = {
    me: propType(myGroupLinksFragment).isRequired,
    toggleMyGroupsDropdownVisibility: PropTypes.func.isRequired,
  }

  toggle = e => {
    e.preventDefault()

    const { toggleMyGroupsDropdownVisibility, me } = this.props
    const value = !me.is_my_groups_dropdown_hidden

    return toggleMyGroupsDropdownVisibility({
      variables: {
        flags: [
          {
            name: 'is_my_groups_dropdown_hidden',
            value,
          },
        ],
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
    })
  }

  openCreateGroup = e => {
    e.preventDefault()

    const modal = new Modal(CreateGroup)
    modal.open()
  }

  render() {
    const {
      me: { groups, is_my_groups_dropdown_hidden },
    } = this.props
    const hasGroups = groups.length > 0

    return (
      <React.Fragment>
        <Header
          onClick={this.toggle}
          hasGroups={hasGroups}
          is_my_groups_dropdown_hidden={is_my_groups_dropdown_hidden}
        >
          Groups
          <BetaBadge>BETA</BetaBadge>
        </Header>

        {!is_my_groups_dropdown_hidden && (
          <React.Fragment>
            {groups.length === 0 && (
              <Text f={1} my="1rem" px="1rem" lineHeight={2}>
                Groups are a new way to collaborate on Are.na.
                <br />
                <LearnMoreLink href="/getting-started-with-groups">
                  Learn more
                </LearnMoreLink>
              </Text>
            )}

            {groups.length > 0 && (
              <Container>
                {groups.map(group => (
                  <MyGroupLink
                    key={`${group.__typename}_${group.id}`}
                    group={group}
                  />
                ))}
              </Container>
            )}

            <GenericButton
              display="flex"
              alignItems="center"
              justifyContent="center"
              f={1}
              mt={5}
              mb={6}
              mx="1rem"
              onClick={this.openCreateGroup}
            >
              <Icons name="Group" size="1rem" color="gray.medium" mr={4} />
              Create group
            </GenericButton>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default graphql(toggleMyGroupsDropdownVisibilityMutation, {
  name: 'toggleMyGroupsDropdownVisibility',
})(MyGroupLinks)
