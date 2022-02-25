import React from 'react'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'
import Pocket from 'v2/components/UI/Pocket'
import CookieLinkUnlessCurrent from 'v2/components/UI/CookieLinkUnlessCurrent'

import { ProfileMetadataView as ProfileMetadataFragment } from '__generated__/ProfileMetadataView'
import useSerializedMe from 'v2/hooks/useSerializedMe'
import { QuestionMarkOverlay } from 'v2/components/ChannelMetadata/components/ChannelMetadataView'
import { Link } from 'react-router-dom'
import Text from 'v2/components/UI/Text'
import { ChannelsSort, SearchSorts } from '__generated__/globalTypes'

type ProfileMetadataViewType =
  | 'all'
  | 'channels'
  | 'following'
  | 'followers'
  | 'index'
  | 'feed'
  | 'blocks'
  | 'table'
  | 'groups'

interface ProfileMetadataViewProps {
  identifiable: ProfileMetadataFragment
  sort: SearchSorts | ChannelsSort
  view: ProfileMetadataViewType
}

const LinkContainer = styled(Box)`
  display: flex;
  align-items: center;

  ${props =>
    props.isActive &&
    `
    svg path {
      fill: ${x => x.theme.colors.gray.block};
    }
  `}
`

export const ProfileMetadataView: React.FC<ProfileMetadataViewProps> = ({
  identifiable,
  sort,
  view,
}) => {
  const isViewActive = (v: ProfileMetadataViewType) => () => view === v
  const { __typename, href } = identifiable
  const me = useSerializedMe()

  const tableLink = me.is_premium ? '?view=table' : '/pricing'

  return (
    <Pocket title="View">
      <CookieLinkUnlessCurrent
        name="view"
        value="channels"
        prefix="Profile"
        to={`${href}/channels?sort=${sort}`}
        isActive={isViewActive('channels')}
      >
        Channels
      </CookieLinkUnlessCurrent>

      {__typename === 'User' && (
        <>
          <CookieLinkUnlessCurrent
            name="view"
            prefix="Profile"
            value="blocks"
            to={`${href}/blocks?sort=${sort}`}
            isActive={isViewActive('blocks')}
          >
            Blocks
          </CookieLinkUnlessCurrent>

          {me.is_premium && (
            <LinkContainer>
              <CookieLinkUnlessCurrent
                name="view"
                value="table"
                prefix={`Profile`}
                to={tableLink}
                isActive={isViewActive('table')}
              >
                Table
              </CookieLinkUnlessCurrent>
              <QuestionMarkOverlay />
            </LinkContainer>
          )}

          {!me.is_premium && (
            <LinkContainer>
              <Link to="/pricing">
                <Text color={'state.premium'} f={2}>
                  Table
                </Text>
              </Link>
              <QuestionMarkOverlay />
            </LinkContainer>
          )}
        </>
      )}

      <CookieLinkUnlessCurrent
        name="view"
        value="index"
        prefix="Profile"
        to={`${href}/index`}
        isActive={isViewActive('index')}
      >
        Index
      </CookieLinkUnlessCurrent>

      {__typename === 'Group' && (
        <CookieLinkUnlessCurrent
          name="view"
          prefix="GroupProfile"
          value="feed"
          to={`${href}/feed`}
          isActive={isViewActive('feed')}
        >
          Feed
        </CookieLinkUnlessCurrent>
      )}

      {__typename === 'User' && (
        <CookieLinkUnlessCurrent
          name="view"
          value="all"
          prefix="Profile"
          to={`${href}/all?sort=${sort}`}
          isActive={isViewActive('all')}
        >
          All
        </CookieLinkUnlessCurrent>
      )}
    </Pocket>
  )
}

export default ProfileMetadataView
