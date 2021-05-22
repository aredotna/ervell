import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import { graphql } from '@apollo/client/react/hoc'
import styled from 'styled-components'

import currentUserService from 'v2/util/currentUserService'

import Avatar from 'v2/components/UI/Avatar'
import UserAvatar from 'v2/components/UserAvatar'
import GenericButton from 'v2/components/UI/GenericButton'

import pendingGroupUserQuery from 'v2/components/CreateGroup/components/PendingGroupUser/queries/pendingGroupUser'
import pendingGroupUserFragment from 'v2/components/CreateGroup/components/PendingGroupUser/fragments/pendingGroupUser'

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
`

const Name = styled.a`
  display: block;
  font-weight: bold;
  color: ${x => x.theme.colors.gray.base};
`

const Button = styled(GenericButton).attrs({
  f: 1,
})`
  align-self: center;
`

class PendingGroupUser extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      user: propType(pendingGroupUserFragment),
    }).isRequired,
    onRemove: PropTypes.func.isRequired,
  }

  remove = () => {
    const {
      data: {
        user: { id },
      },
      onRemove,
    } = this.props
    return onRemove(id)
  }

  render() {
    const {
      data: { loading },
    } = this.props

    if (loading) {
      return (
        <Container>
          <Representation>
            <Avatar />

            <Information>
              <Name>...</Name>
            </Information>
          </Representation>
        </Container>
      )
    }

    const {
      data: { user },
    } = this.props
    const isOwner = currentUserService().id === user.id

    return (
      <Container>
        <Representation>
          <UserAvatar user={user} />

          <Information>
            <Name href={user.href}>{user.name}</Name>
          </Information>
        </Representation>

        <Button onClick={this.remove} disabled={isOwner}>
          {isOwner ? 'Owner' : 'Remove'}
        </Button>
      </Container>
    )
  }
}

export default graphql(pendingGroupUserQuery)(PendingGroupUser)
