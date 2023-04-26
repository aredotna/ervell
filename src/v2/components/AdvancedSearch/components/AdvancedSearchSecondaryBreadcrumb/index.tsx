import { useQuery } from '@apollo/client'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import {
  Crumb,
  CrumbContainer,
  FirstCrumb,
} from 'v2/components/UI/BreadcrumbPath'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import ColoredChannelLink from 'v2/components/UI/ColoredChannelLink'

import { Where } from '__generated__/globalTypes'
import {
  SecondaryChannelBreadcrumbQuery,
  SecondaryChannelBreadcrumbQueryVariables,
} from '__generated__/SecondaryChannelBreadcrumbQuery'
import {
  SecondaryUserBreadcrumbQuery,
  SecondaryUserBreadcrumbQueryVariables,
} from '__generated__/SecondaryUserBreadcrumbQuery'
import secondaryChannelBreadcrumbQuery from './queries/secondaryChannelBreadcrumbQuery'
import secondaryUserBreadcrumbQuery from './queries/secondaryUserBreadcrumbQuery'
import { getBreadcrumbPath } from 'v2/util/getBreadcrumbPath'
import { unescape } from 'lodash'

const A = styled.a``

interface SecondaryBreadcrumbsProps {
  where: Where[]
  context: Where
}

export const SecondaryBreadcrumbs: React.FC<SecondaryBreadcrumbsProps> = ({
  where,
  context,
}) => {
  const sortedWhere = where.sort((a, b) => a.facet.localeCompare(b.facet))
  const totalUsers = sortedWhere.filter(w => w.facet === 'USER').length
  const totalChannels = sortedWhere.filter(w => w.facet === 'CHANNEL').length
  return (
    <>
      {sortedWhere.map((crumb, index) => {
        return (
          <SecondaryBreadcrumb
            key={index}
            index={index}
            where={crumb}
            context={context}
            totalUsers={totalUsers}
            totalChannels={totalChannels}
          />
        )
      })}
    </>
  )
}

interface SecondaryBreadcrumbProps {
  where: Where
  index: number
  context: Where
  total?: number
  totalUsers?: number
  totalChannels?: number
}

export const SecondaryBreadcrumb: React.FC<SecondaryBreadcrumbProps> = props => {
  const { where } = props
  if (where.facet === 'USER') {
    return <SecondaryUserBreadcrumb {...props} />
  }

  if (where.facet === 'CHANNEL') {
    return <SecondaryChannelBreadcrumb {...props} />
  }

  return null
}

export const SecondaryChannelBreadcrumb: React.FC<SecondaryBreadcrumbProps> = ({
  where,
}) => {
  const { data, loading } = useQuery<
    SecondaryChannelBreadcrumbQuery,
    SecondaryChannelBreadcrumbQueryVariables
  >(secondaryChannelBreadcrumbQuery, {
    variables: {
      channel_id: where.id,
    },
  })

  if (loading) {
    return (
      <CrumbContainer>
        <Crumb>
          <LoadingIndicator />
        </Crumb>
      </CrumbContainer>
    )
  }

  if (!data || !data.channel) {
    return null
  }

  const { channel } = data

  return (
    <CrumbContainer>
      <FirstCrumb>+</FirstCrumb>
      <Crumb>
        <Link to={channel.owner.href}>{channel.owner.name}</Link>
      </Crumb>
      <Crumb>
        <ColoredChannelLink
          as={Link}
          to={channel.href}
          state={getBreadcrumbPath(channel.owner)}
          visibility={channel.visibility}
        >
          {channel.title}
        </ColoredChannelLink>
      </Crumb>
    </CrumbContainer>
  )
}

export const SecondaryUserBreadcrumb: React.FC<SecondaryBreadcrumbProps> = ({
  index,
  where,
  context,
  totalUsers,
  totalChannels,
}) => {
  const { data, loading } = useQuery<
    SecondaryUserBreadcrumbQuery,
    SecondaryUserBreadcrumbQueryVariables
  >(secondaryUserBreadcrumbQuery, {
    variables: {
      user_id: where.id,
    },
  })

  if (loading) {
    return (
      <CrumbContainer>
        <Crumb>
          <LoadingIndicator />
        </Crumb>
      </CrumbContainer>
    )
  }

  if (!data || !data.user) {
    return null
  }

  const isFirst = index === totalChannels
  const contextIsUser = context?.facet === 'USER'
  const isFirstAndOnly = isFirst && totalUsers === 1
  const isNotFirstOfUsers = totalUsers > 1 && !isFirst
  const prepended = isNotFirstOfUsers || contextIsUser ? 'OR ' : '→ '
  const appended = isFirstAndOnly && !contextIsUser ? ' only' : ''

  const label = `${prepended}owned by ${unescape(data.user.name)}${appended}`

  if (contextIsUser) {
    return (
      <CrumbContainer>
        <FirstCrumb>OR</FirstCrumb>
        <Crumb>
          <A href={data.user.href}>{unescape(data.user.name)}</A>
        </Crumb>
      </CrumbContainer>
    )
  }

  return (
    <CrumbContainer>
      <Crumb>
        <A href={data.user.href}>{unescape(label)}</A>
      </Crumb>
    </CrumbContainer>
  )
}
