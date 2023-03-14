import React, { useEffect } from 'react'
import { Route, useLocation, Routes, useNavigationType } from 'react-router-dom'

// Feed
import FeedPage from 'v2/pages/feed/FeedPage'
import HomePage from 'v2/pages/home/HomePage'
import ExplorePage from 'v2/pages/explore/ExplorePage'
import NotificationPage from 'v2/pages/feed/NotificationPage'
// Search
import SearchPage from 'v2/pages/search/SearchPage'
// Profile
import ProfilePage from '../../v2/pages/profile/ProfilePage'
// Channel
import SharedChannelPage from 'v2/pages/channel/SharedChannelPage'
import ChannelFollowersPage from 'v2/pages/channel/ChannelFollowersPage'
import ChannelPageWrapper from 'v2/pages/channel/ChannelPageWrapper'
import EmbeddedChannelPage from 'v2/pages/channel/EmbeddedChannelPage'
import { ChannelSearchPage } from 'v2/pages/channel/ChannelSearchPage'

// Block
import BlockPage from 'v2/pages/block'
// Settings
import SettingsPage from 'v2/pages/settings'
// Tools
import { ToolsPage } from 'v2/pages/tools'
// Accept invite
import { AcceptInvitePage } from 'v2/pages/accept_invite/AcceptInvitePage'

// Block modal

import { BlogIndex } from 'v2/pages/blog/BlogIndex'
import { BlogPost } from 'v2/pages/blog/BlogPost'
import { ConfirmationPage } from 'v2/pages/confirmation/ConfirmationPage'
import { ExpiredConfirmationPage } from 'v2/pages/confirmation/ExpiredConfirmationPage'
import useLoginStatus from 'v2/hooks/useLoginStatus'
import { AboutPage } from 'v2/pages/about/AboutPage'
import RoadmapPage from 'v2/pages/about/RoadmapPage'
import PricingPage from 'v2/pages/about/PricingPage'
import { EducationPage } from 'v2/pages/about/EducationPage'
import { Search2Page } from 'v2/pages/search2'
import { ModalBlockWrapper } from 'v2/pages/block/ModalBlockWrapper'
import { ProfileSearchPage } from 'v2/pages/profile/ProfileSearchPage'

export const AppRoutes = () => {
  const { isLoggedIn } = useLoginStatus()

  const location = useLocation()
  const state = location.state as any
  const type = useNavigationType()

  const background = state && state.background && JSON.parse(state.background)

  const preventScroll = state && state.preventScroll

  const SearchComponent = isLoggedIn ? Search2Page : SearchPage

  useEffect(() => {
    if (!background && !preventScroll && type != 'POP') {
      window.scrollTo(0, 0)
    }
  }, [location?.pathname, background, preventScroll, type])

  return (
    <>
      <Routes location={background || location}>
        {/* Feed */}
        <Route path="feed" element={<FeedPage />} />

        {/* Explore */}
        <Route path="explore" element={<ExplorePage />}>
          <Route path=":view" element={<ExplorePage />} />
        </Route>

        {/* Notifications */}
        <Route path="notifications" element={<NotificationPage />} />

        {/* About pages */}
        <Route path="about/:section" element={<AboutPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="roadmap" element={<RoadmapPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="education" element={<EducationPage />} />

        {/* Search */}
        <Route path="search" element={<SearchComponent />}>
          <Route path=":term" element={<SearchComponent />}>
            <Route path=":view" element={<SearchComponent />} />
          </Route>
        </Route>

        {/* Block */}
        <Route path="block/:id" element={<BlockPage />} />

        {/* Settings */}
        <Route path="settings" element={<SettingsPage />}>
          <Route path=":tab" element={<SettingsPage />} />
        </Route>

        {/* Tools */}
        <Route path="tools/:tab" element={<ToolsPage />} />
        <Route path="tools" element={<ToolsPage />} />

        {/* Accept group invite */}
        <Route path="group/:id/invite/:code" element={<AcceptInvitePage />} />

        {/* Confirm account */}
        <Route path="confirm/expired" element={<ExpiredConfirmationPage />} />
        <Route path="confirm/:token" element={<ConfirmationPage />} />
        <Route path="confirm" />

        {/* Blog */}
        <Route path="blog/:id" element={<BlogPost />} />
        <Route path="blog" element={<BlogIndex />} />

        {/* Profile */}
        {/* 
            | 'all'
            | 'channels'
            | 'blocks'
            | 'followers'
            | 'following'
            | 'feed'
            | 'table'
            | 'index'
            | 'groups' 
          */}

        <Route
          path=":id/following"
          element={<ProfilePage view="following" />}
        />
        <Route path=":id/all" element={<ProfilePage view="all" />} />
        <Route path=":id/channels" element={<ProfilePage view="channels" />} />
        <Route path=":id/blocks" element={<ProfilePage view="blocks" />} />
        <Route
          path=":id/followers"
          element={<ProfilePage view="followers" />}
        />
        <Route path=":id/feed" element={<ProfilePage view="feed" />} />
        <Route path=":id/table" element={<ProfilePage view="table" />} />
        <Route path=":id/index" element={<ProfilePage view="index" />} />
        <Route path=":id/groups" element={<ProfilePage view="groups" />} />

        <Route path=":id/search" element={<ProfileSearchPage />} />

        <Route path=":id" element={<ProfilePage />} />

        {/* Channel */}
        <Route
          path=":user_id/:id/followers"
          element={<ChannelFollowersPage />}
        />
        <Route
          path=":user_id/:id/table"
          element={<ChannelPageWrapper view="table" />}
        />
        <Route
          path=":user_id/:id/grid"
          element={<ChannelPageWrapper view="grid" />}
        />
        <Route path=":user_id/:id/embed" element={<EmbeddedChannelPage />} />
        <Route path=":user_id/:id/search" element={<ChannelSearchPage />} />
        <Route path=":user_id/:id" element={<ChannelPageWrapper />} />

        {/* Share Channel */}
        <Route path="share/:token" element={<SharedChannelPage />} />

        {/* Home */}
        {isLoggedIn ? (
          <Route path="/" element={<FeedPage />} />
        ) : (
          <Route path="/" element={<HomePage />} />
        )}
      </Routes>

      {background && (
        <Routes>
          <Route path="/block/:id" element={<ModalBlockWrapper />} />
        </Routes>
      )}
    </>
  )
}
