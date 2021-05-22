import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import profilePageIdentifiableFragment from 'v2/pages/profile/ProfilePage/fragments/profilePageIdentifiable'

import EmptyMessageOrComponent from 'v2/pages/profile/ProfilePage/components/EmptyMessageOrComponent'
import ProfileContents from 'v2/components/ProfileContents'

import ProfileChannels from 'v2/components/ProfileChannels'
import ProfileChannelIndex from 'v2/components/ProfileChannelIndex'
import ProfileFollows from 'v2/components/ProfileFollows'
import ProfileGroups from 'v2/components/ProfileGroups'
import GroupProfileFeed from 'v2/components/GroupProfileFeed/index'

const All = ({ id, sort, identifiable, fetchPolicy }) => (
  <EmptyMessageOrComponent
    identifiable={identifiable}
    count={identifiable.counts.channels + identifiable.counts.blocks}
  >
    <ProfileContents id={id} sort={sort} fetchPolicy={fetchPolicy} />
  </EmptyMessageOrComponent>
)

All.propTypes = {
  id: PropTypes.string.isRequired,
  sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM', 'CREATED_AT']).isRequired,
  identifiable: propType(profilePageIdentifiableFragment).isRequired,
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
}

const Blocks = ({ id, sort, identifiable, fetchPolicy, type }) => (
  <EmptyMessageOrComponent
    identifiable={identifiable}
    count={identifiable.counts.blocks}
  >
    <ProfileContents
      id={id}
      type={type}
      sort={sort}
      fetchPolicy={fetchPolicy}
      blockType={type}
    />
  </EmptyMessageOrComponent>
)

Blocks.propTypes = {
  id: PropTypes.string.isRequired,
  sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM', 'CREATED_AT']).isRequired,
  identifiable: propType(profilePageIdentifiableFragment).isRequired,
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
  type: PropTypes.oneOf([
    'BLOCK',
    'IMAGE',
    'TEXT',
    'EMBED',
    'ATTACHMENT',
    'LINK',
  ]).isRequired,
}

const Channels = ({ id, sort, identifiable, fetchPolicy }) => (
  <EmptyMessageOrComponent
    identifiable={identifiable}
    count={identifiable.counts.channels}
  >
    <ProfileChannels id={id} sort={sort} fetchPolicy={fetchPolicy} />
  </EmptyMessageOrComponent>
)

Channels.propTypes = {
  id: PropTypes.string.isRequired,
  sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM', 'CREATED_AT']).isRequired,
  identifiable: propType(profilePageIdentifiableFragment).isRequired,
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
}

const Index = ({ id, filter, identifiable }) => (
  <EmptyMessageOrComponent
    identifiable={identifiable}
    count={identifiable.counts.channels}
  >
    <ProfileChannelIndex id={id} type={filter} />
  </EmptyMessageOrComponent>
)

Index.propTypes = {
  id: PropTypes.string.isRequired,
  filter: PropTypes.oneOf(['OWN', 'COLLABORATION']).isRequired,
  identifiable: propType(profilePageIdentifiableFragment).isRequired,
}

const Followers = ({ id, fetchPolicy }) => (
  <ProfileFollows id={id} type="followers" fetchPolicy={fetchPolicy} />
)

Followers.propTypes = {
  id: PropTypes.string.isRequired,
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
  filter: PropTypes.oneOf(['OWN', 'COLLABORATION']).isRequired,
}

const Following = ({ id, followType, fetchPolicy }) => (
  <ProfileFollows
    id={id}
    type="following"
    followType={followType}
    fetchPolicy={fetchPolicy}
  />
)

Following.propTypes = {
  id: PropTypes.string.isRequired,
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
  followType: PropTypes.oneOf(['ALL', 'CHANNEL', 'GROUP', 'USER']).isRequired,
}

const Groups = ({ id, fetchPolicy }) => (
  <ProfileGroups id={id} fetchPolicy={fetchPolicy} />
)

Groups.propTypes = {
  id: PropTypes.string.isRequired,
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
}

const GroupFeed = ({ id, fetchPolicy }) => (
  <GroupProfileFeed id={id} fetchPolicy={fetchPolicy} />
)

GroupFeed.propTypes = {
  id: PropTypes.string.isRequired,
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
}

class ProfileViews extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // Once the view changes switch into "network-only" mode
    if (nextProps.view !== prevState.renderedView) {
      return { fetchPolicy: 'network-only' }
    }
    return null
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM', 'CREATED_AT']).isRequired,
    filter: PropTypes.oneOf(['OWN', 'COLLABORATION']).isRequired,
    followType: PropTypes.oneOf(['ALL', 'CHANNEL', 'GROUP', 'USER']).isRequired,
    identifiable: propType(profilePageIdentifiableFragment).isRequired,
    type: PropTypes.oneOf([
      'BLOCK',
      'IMAGE',
      'TEXT',
      'EMBED',
      'ATTACHMENT',
      'LINK',
    ]).isRequired,
  }

  state = {
    fetchPolicy: 'cache-first',
    // eslint-disable-next-line
    renderedView: this.props.view,
  }

  render() {
    const { fetchPolicy } = this.state
    const {
      view,
      id,
      sort,
      filter,
      identifiable,
      followType,
      type,
    } = this.props

    switch (view) {
      case 'all':
        return (
          <All
            id={id}
            sort={sort}
            identifiable={identifiable}
            fetchPolicy={fetchPolicy}
          />
        )
      case 'channels':
        return (
          <Channels
            id={id}
            sort={sort}
            identifiable={identifiable}
            fetchPolicy={fetchPolicy}
          />
        )
      case 'blocks':
        return (
          <Blocks
            id={id}
            sort={sort}
            identifiable={identifiable}
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
          <Following
            id={id}
            followType={followType}
            fetchPolicy={fetchPolicy}
          />
        )
      case 'groups':
        return <Groups id={id} fetchPolicy={fetchPolicy} />
      case 'feed':
        return <GroupFeed id={id} fetchPolicy={fetchPolicy} />
      default:
        return null
    }
  }
}

export default ProfileViews
