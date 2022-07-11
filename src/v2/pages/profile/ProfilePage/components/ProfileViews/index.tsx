import React, { useContext, useEffect, useState } from 'react'
import { FetchPolicy } from '@apollo/client'

import EmptyMessageOrComponent from 'v2/pages/profile/ProfilePage/components/EmptyMessageOrComponent'
import ProfileContents from 'v2/components/ProfileContents'

import ProfileChannels from 'v2/components/ProfileChannels'
import ProfileChannelIndex from 'v2/components/ProfileChannelIndex'
import ProfileFollows from 'v2/components/ProfileFollows'
import ProfileGroups from 'v2/components/ProfileGroups'
import GroupProfileFeed from 'v2/components/GroupProfileFeed/index'
import {
  ChannelsSort,
  ConnectableTypeEnum,
  FollowingTypeEnum,
  IndexedChannelsTypes,
  SearchSorts,
} from '__generated__/globalTypes'
import {
  ProfilePageIdentifiable,
  ProfilePageIdentifiable_User,
} from '__generated__/ProfilePageIdentifiable'
import { ProfileViewTypes } from '../..'
import ProfileTable from 'v2/components/ProfileTable'
import useSerializedMe from 'v2/hooks/useSerializedMe'
import { PageContext, PageTypeEnum } from 'v2/components/PageContext'

interface AllProps {
  id: string
  sort: SearchSorts
  identifiable: ProfilePageIdentifiable
  fetchPolicy: FetchPolicy
}

const All: React.FC<AllProps> = ({ id, sort, identifiable, fetchPolicy }) => {
  const count =
    identifiable.__typename == 'Group'
      ? identifiable.counts.channels
      : identifiable.counts.channels + identifiable.counts.blocks
  return (
    <EmptyMessageOrComponent identifiable={identifiable} count={count}>
      <ProfileContents
        id={id}
        type={null}
        sort={sort}
        fetchPolicy={fetchPolicy}
      />
    </EmptyMessageOrComponent>
  )
}

interface BlocksProps {
  id: string
  sort: SearchSorts
  identifiable: ProfilePageIdentifiable_User
  fetchPolicy: FetchPolicy
  type: ConnectableTypeEnum
}

const Blocks: React.FC<BlocksProps> = ({
  id,
  sort,
  identifiable,
  fetchPolicy,
  type,
}) => {
  type = type || ConnectableTypeEnum.BLOCK
  return (
    <EmptyMessageOrComponent
      identifiable={identifiable}
      count={identifiable.counts.blocks}
    >
      <ProfileContents
        id={id}
        type={type}
        sort={sort}
        fetchPolicy={fetchPolicy}
      />
    </EmptyMessageOrComponent>
  )
}

interface ChannelsProps {
  id: string
  sort: ChannelsSort
  identifiable: ProfilePageIdentifiable
  fetchPolicy: FetchPolicy
}

const Channels: React.FC<ChannelsProps> = ({
  id,
  sort,
  identifiable,
  fetchPolicy,
}) => (
  <EmptyMessageOrComponent
    identifiable={identifiable}
    count={identifiable.counts.channels}
  >
    <ProfileChannels id={id} sort={sort} fetchPolicy={fetchPolicy} />
  </EmptyMessageOrComponent>
)

interface IndexProps {
  id: string
  filter: IndexedChannelsTypes
  identifiable: ProfilePageIdentifiable
}

const Index: React.FC<IndexProps> = ({ id, filter, identifiable }) => (
  <EmptyMessageOrComponent
    identifiable={identifiable}
    count={identifiable.counts.channels}
  >
    <ProfileChannelIndex id={id} type={filter} />
  </EmptyMessageOrComponent>
)

interface TableProps {
  id: string
  type?: ConnectableTypeEnum
  sort: SearchSorts
  identifiable: ProfilePageIdentifiable
  fetchPolicy: FetchPolicy
}

const Table: React.FC<TableProps> = ({ identifiable, id, type }) => {
  const count =
    identifiable.__typename == 'Group'
      ? identifiable.counts.channels
      : identifiable.counts.channels + identifiable.counts.blocks
  return (
    <EmptyMessageOrComponent identifiable={identifiable} count={count}>
      <ProfileTable id={id} type={type} />
    </EmptyMessageOrComponent>
  )
}

interface FollowersProps {
  id: string
  fetchPolicy: FetchPolicy
}

const Followers: React.FC<FollowersProps> = ({ id, fetchPolicy }) => (
  <ProfileFollows id={id} type="followers" fetchPolicy={fetchPolicy} />
)

interface FollowingProps {
  id: string
  followType: FollowingTypeEnum
  fetchPolicy: FetchPolicy
}

const Following: React.FC<FollowingProps> = ({
  id,
  followType,
  fetchPolicy,
}) => (
  <ProfileFollows
    id={id}
    type="following"
    followType={followType}
    fetchPolicy={fetchPolicy}
  />
)

interface GroupsProps {
  id: string
  fetchPolicy: FetchPolicy
}

const Groups: React.FC<GroupsProps> = ({ id, fetchPolicy }) => (
  <ProfileGroups id={id} fetchPolicy={fetchPolicy} />
)

interface GroupFeedProps {
  id: string
}

const GroupFeed: React.FC<GroupFeedProps> = ({ id }) => (
  <GroupProfileFeed id={id} />
)

interface ProfileViewsProps {
  id: string
  sort: SearchSorts | ChannelsSort
  filter: IndexedChannelsTypes
  followType: FollowingTypeEnum
  identifiable: ProfilePageIdentifiable
  type: ConnectableTypeEnum
  view: ProfileViewTypes
  scheme: 'GROUP' | 'DEFAULT'
}

const ProfileViews: React.FC<ProfileViewsProps> = ({
  view,
  id,
  sort,
  filter,
  identifiable,
  followType,
  type,
  scheme,
}) => {
  const [renderedView, setRenderedView] = useState<ProfileViewTypes>(view)
  const [fetchPolicy] = useState<FetchPolicy>('cache-first')

  const { is_premium } = useSerializedMe()

  const { setPage } = useContext(PageContext)
  const pageType = {
    GROUP: PageTypeEnum.GROUP,
    DEFAULT: PageTypeEnum.PERSON,
  }[scheme]

  console.log({ id })

  useEffect(() => {
    setPage({
      type: pageType,
      id,
    })
  }, [])

  useEffect(() => {
    if (view != renderedView) {
      setRenderedView(view)
    }
  }, [view])

  switch (view) {
    case 'all':
      return (
        <All
          id={id}
          sort={sort as SearchSorts}
          identifiable={identifiable}
          fetchPolicy={fetchPolicy}
        />
      )
    case 'channels':
      return (
        <Channels
          id={id}
          sort={sort as ChannelsSort}
          identifiable={identifiable}
          fetchPolicy={fetchPolicy}
        />
      )
    case 'blocks':
      return (
        <Blocks
          id={id}
          sort={sort as SearchSorts}
          identifiable={identifiable as ProfilePageIdentifiable_User}
          fetchPolicy={fetchPolicy}
          type={type}
        />
      )
    case 'index':
      return <Index id={id} filter={filter} identifiable={identifiable} />
    case 'followers':
      return <Followers id={id} fetchPolicy={fetchPolicy} />
    case 'following':
      return (
        <Following id={id} followType={followType} fetchPolicy={fetchPolicy} />
      )
    case 'table':
      if (is_premium) {
        return (
          <Table
            id={id}
            sort={sort as SearchSorts}
            type={type}
            identifiable={identifiable}
            fetchPolicy={fetchPolicy}
          />
        )
      }

      return (
        <All
          id={id}
          sort={sort as SearchSorts}
          identifiable={identifiable}
          fetchPolicy={fetchPolicy}
        />
      )
    case 'groups':
      return <Groups id={id} fetchPolicy={fetchPolicy} />
    case 'feed':
      return <GroupFeed id={id} />
    default:
      return null
  }
}

export default ProfileViews
