import React from 'react'
import { useQuery, useMutation } from '@apollo/client'

import styled from 'styled-components'

import Title from 'v2/components/UI/Head/components/Title'
import CenteringBox from 'v2/components/UI/CenteringBox'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import Text from 'v2/components/UI/Text'
import Count from 'v2/components/UI/Count'
import Box from 'v2/components/UI/Box'
import { GenericButton as Button } from 'v2/components/UI/GenericButton'

import GROUP_BY_CODE_QUERY from 'v2/pages/accept_invite/AcceptInvitePage/queries/groupByCode'
import {
  GroupByCodeQuery,
  GroupByCodeQueryVariables,
} from '__generated__/GroupByCodeQuery'

import ACCEPT_GROUP_INVITE_MUTATION from 'v2/pages/accept_invite/AcceptInvitePage/mutations/acceptInvitation'
import {
  acceptGroupInvite as AcceptGroupInviteMutation,
  acceptGroupInviteVariables as AcceptGroupInviteMutationVariables,
} from '__generated__/acceptGroupInvite'

const Headline = styled(Text).attrs({
  fontSize: 8,
  lineHeight: 1,
  align: 'center',
  my: 3,
})``

const Container = styled(CenteringBox)`
  flex-direction: column;
`

const ButtonContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const SmallLink = styled(Text).attrs({ f: 1 })`
  text-decoration: underline;
  cursor: pointer;
`

interface AcceptInvitePageProps {
  code: string
}

export const AcceptInvitePage: React.FC<AcceptInvitePageProps> = ({ code }) => {
  const { data, loading, error } = useQuery<
    GroupByCodeQuery,
    GroupByCodeQueryVariables
  >(GROUP_BY_CODE_QUERY, {
    variables: { code },
  })

  const [acceptInviteCode] = useMutation<
    AcceptGroupInviteMutation,
    AcceptGroupInviteMutationVariables
  >(ACCEPT_GROUP_INVITE_MUTATION)

  if (loading) {
    return <LoadingIndicator />
  }

  if (error) {
    return <Headline>{error.message}</Headline>
  }

  const onAccept = () => {
    acceptInviteCode({
      variables: { code },
    }).then(response => {
      window.location.href = response.data.accept_group_invite.group.href
    })
  }

  const { group_by_code: group } = data

  return (
    <Container>
      <Title>Join {group.name}</Title>
      <Headline>
        You have been invited to join <strong>{group.name}</strong>.
      </Headline>

      <Headline>
        <strong>{group.name}</strong> has{' '}
        <Count label="channel" amount={group.counts.channels} /> and{' '}
        <Count label="member" amount={group.counts.users} />.
      </Headline>

      <Headline>
        <strong>
          <a href={group.user.href} target="_blank" rel="noopener noreferrer">
            {group.user.name}
          </a>
        </strong>{' '}
        is the group admin.
      </Headline>

      <Headline pt={6}>Do you wish to join?</Headline>
      <ButtonContainer mt={8}>
        <Button bg="white" f={6} mb={7} onClick={onAccept}>
          Yes
        </Button>
        <SmallLink>
          <a href="/">No, but thanks anyway.</a>
        </SmallLink>
      </ButtonContainer>
    </Container>
  )
}
