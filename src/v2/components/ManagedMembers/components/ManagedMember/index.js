import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import styled from 'styled-components'

import currentUserService from 'v2/util/currentUserService'

import MemberAvatar from 'v2/components/MemberAvatar'
import GenericButton from 'v2/components/UI/GenericButton'
import Badge from 'v2/components/UI/Badge'

import managedMemberFragment from 'v2/components/ManagedMembers/components/ManagedMember/fragments/managedMember'

const Container = styled.div`
  display: flex;
  padding: 0.5em;
  border-top: 1px solid ${x => x.theme.colors.gray.light};
`

const Representation = styled.div`
  display: flex;
  flex: 1;
`

const Information = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 1em;
  font-size: ${x => x.theme.fontSizesIndexed.xs};
  line-height: ${x => x.theme.lineHeightsIndexed.base};

  &:first-child {
    padding-left: 0;
  }
`

const Name = styled.a`
  display: block;
  font-weight: bold;
  color: ${x => x.theme.colors.gray.base};
`

const Warning = styled.div`
  color: ${x => x.theme.colors.state.alert};
`

const Amount = styled.div`
  color: ${x => x.theme.colors.gray.medium};
`

const Button = styled(GenericButton).attrs({
  f: 1,
})`
  align-self: flex-start;
`

export default class ManagedMembers extends Component {
  static propTypes = {
    isOwner: PropTypes.bool,
    isRemovable: PropTypes.bool,
    confirmationWarning: PropTypes.string,
    confirmationSelfWarning: PropTypes.string,
    onRemove: PropTypes.func.isRequired,
    member: propType(managedMemberFragment).isRequired,
  }

  static defaultProps = {
    isOwner: false,
    isRemovable: true,
    confirmationWarning: 'Are you sure?',
    confirmationSelfWarning: null,
  }

  state = {
    mode: 'resting',
  }

  remove = () => {
    const { mode } = this.state

    if (mode === 'clicked') {
      return this.setState({ mode: 'resting' })
    }

    return this.setState({ mode: 'clicked' })
  }

  confirm = () => {
    const { onRemove, member } = this.props

    this.setState({ mode: 'removing' })

    return onRemove({
      member_id: member.id,
      member_type: member.__typename.toUpperCase(),
    }).catch(() => this.setState({ mode: 'error' }))
  }

  render() {
    const { mode } = this.state

    const {
      member,
      isOwner,
      isRemovable,
      confirmationWarning,
      confirmationSelfWarning,
    } = this.props

    return (
      <Container>
        <Representation>
          {member.__typename === 'User' && <MemberAvatar member={member} />}

          <Information>
            <Name href={member.href}>
              {member.name}
              {member.__typename === 'Group' && (
                <Badge
                  ml={2}
                  f={0}
                  color="gray.medium"
                  icon={{ private: 'Lock' }[member.visibility]}
                >
                  Group
                </Badge>
              )}
            </Name>

            {member.__typename === 'Group' && mode !== 'clicked' && (
              <Amount>Group started by {member.user.name}</Amount>
            )}

            {mode === 'clicked' && (
              <Warning>
                {currentUserService().id === member.id &&
                  `${confirmationSelfWarning} `}

                {`${confirmationWarning} `}

                <a onClick={this.confirm} role="button" tabIndex={0}>
                  <strong>Confirm</strong>
                </a>
              </Warning>
            )}
          </Information>
        </Representation>

        {isOwner && <Button disabled>Owner</Button>}

        {!isOwner && isRemovable && (
          <Button
            onClick={this.remove}
            color={mode === 'clicked' ? 'state.alert' : undefined}
          >
            {
              {
                resting: 'Remove',
                clicked: 'Cancel',
                removing: 'Removing...',
                error: 'Error',
              }[mode]
            }
          </Button>
        )}
      </Container>
    )
  }
}
