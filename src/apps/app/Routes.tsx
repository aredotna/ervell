import React, { useEffect } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import parseRoute from '../../v2/util/parseRoute'

// Feed
import FeedPage from '../../v2/pages/feed/FeedPage'
import ExplorePage from '../../v2/pages/explore/ExplorePage'
import NotificationPage from '../../v2/pages/feed/NotificationPage'
// Search
import SearchPage from 'v2/pages/search/SearchPage'
// Profile
import ProfilePage from '../../v2/pages/profile/ProfilePage'
// Channel
import ChannelPage from '../../v2/pages/channel/ChannelPage'
import ChannelTablePage from '../../v2/pages/channel/ChannelTablePage'
import SharedChannelPage from '../../v2/pages/channel/SharedChannelPage'
import ChannelFollowersPage from '../../v2/pages/channel/ChannelFollowersPage'
import EmbeddedChannelPage from '../../v2/pages/channel/EmbeddedChannelPage'
// Block
import BlockPage from '../../v2/pages/block'
// Settings
import SettingsPage from 'v2/pages/settings'
// Tools
import { ToolsPage } from 'v2/pages/tools'
// Accept invite
import { AcceptInvitePage } from 'v2/pages/accept_invite/AcceptInvitePage'

// Block modal
import Modal from 'v2/components/UI/Modal/Portal'
import ModalFullscreenDialog from 'v2/components/UI/ModalFullscreenDialog'
import { ModalBlockLightbox } from 'v2/components/ModalBlockLightbox'
import { BlogIndex } from 'v2/pages/blog/BlogIndex'
import { BlogPost } from 'v2/pages/blog/BlogPost'
import { ConfirmationPage } from 'v2/pages/confirmation/ConfirmationPage'
import { ExpiredConfirmationPage } from 'v2/pages/confirmation/ExpiredConfirmationPage'
import isDev from 'v2/util/isDev'
import useLoginStatus from 'v2/hooks/useLoginStatus'
import HomePage from 'v2/pages/home/HomePage'

export const Routes = () => {
  const { isLoggedIn } = useLoginStatus()

  const location = useLocation()
  const background =
    location.state &&
    location.state.background &&
    JSON.parse(location.state.background)
  const preventScroll = location.state && location.state.preventScroll

  useEffect(() => {
    if (!background && !preventScroll) {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, background, preventScroll])

  return (
    <>
      <Switch location={background || location}>
        {/* Feed */}
        <Route exact path="/feed" component={FeedPage} />

        {/* Explore */}
        <Route
          exact
          path="/explore/:view?"
          render={parseRoute(({ params, query }) => (
            <ExplorePage params={params} query={query} />
          ))}
        />

        <Route exact path="/notifications" component={NotificationPage} />

        {isLoggedIn ? (
          <Route exact path="/" component={FeedPage} />
        ) : (
          <Route exact path="/" component={HomePage} />
        )}

        {/* Search */}
        <Route
          exact
          path="/search/:term/:view?"
          render={parseRoute(({ params, query }) => (
            <SearchPage params={params} query={query} />
          ))}
        />

        {/* Block */}
        <Route
          exact
          path="/block/:id"
          render={parseRoute(({ params }) => {
            return <BlockPage id={parseInt(params.id, 10)} />
          })}
        />

        {/* Settings */}
        <Route
          path="/settings/:view(billing|group_billing|perks)?"
          render={parseRoute(({ params }) => (
            <SettingsPage tab={params.view || 'general'} />
          ))}
        />

        {/* Tools */}
        <Route
          path="/tools/:view(bookmarklet|find-friends|add-via-email|send-invitation)?"
          render={parseRoute(({ params }) => {
            return <ToolsPage tab={params.view || 'bookmarklet'} />
          })}
        />

        {/* Accept group invite */}
        <Route
          path="/group/:id/invite/:code"
          render={parseRoute(({ params }) => (
            <AcceptInvitePage code={params.code} />
          ))}
        />

        {/* Confirm account */}
        <Route
          path="/confirm/expired"
          render={parseRoute(({ query }) => (
            <ExpiredConfirmationPage email={query.email} />
          ))}
        />

        <Route
          path="/confirm/:token"
          render={parseRoute(({ params }) => (
            <ConfirmationPage token={params.token} />
          ))}
        />

        {/* Blog */}
        <Route exact path="/blog" component={BlogIndex} />

        <Route
          path="/blog/:slug"
          render={parseRoute(({ params }) => (
            <BlogPost slug={params.slug} />
          ))}
        />

        {/* Profile */}
        <Route
          exact
          path="/:id/:view(all|index|blocks|channels|followers|following|groups|feed)?"
          render={parseRoute(({ params, query }) => (
            <ProfilePage params={params} query={query} />
          ))}
        />

        {/* Channel */}
        <Route
          path="/share/:token"
          render={parseRoute(({ params }) => (
            <SharedChannelPage token={params.token} />
          ))}
        />

        <Route
          path="/:user_id/:id/followers"
          render={parseRoute(({ params }) => (
            <ChannelFollowersPage id={params.id} />
          ))}
        />

        <Route
          path="/:user_id/:id/embed"
          render={parseRoute(({ params, query }) => (
            <EmbeddedChannelPage
              id={params.id}
              per={parseInt(query.per, 10) || 8}
            />
          ))}
        />

        {isDev && (
          <Route
            exact
            path="/:user_id/:id/table"
            render={parseRoute(({ params, query }) => {
              return (
                <ChannelTablePage
                  id={params.id}
                  key={params.id}
                  fromOnboarding={query.fromOnboarding}
                />
              )
            })}
          />
        )}

        {/* Channel */}
        <Route
          exact
          path="/:user_id/:id"
          render={parseRoute(({ params, query }) => {
            return (
              <ChannelPage
                id={params.id}
                key={params.id}
                fromOnboarding={query.fromOnboarding}
              />
            )
          })}
        />
      </Switch>

      {background && (
        <Route
          path="/block/:id"
          render={parseRoute(({ params }) => {
            const context = location.state.context

            const ids = [
              ...new Set<number>(
                context
                  .filter(
                    k =>
                      k.__typename !== 'Channel' &&
                      k.__typename !== 'Group' &&
                      k.__typename !== 'User'
                  )
                  .map(k => k.id)
              ),
            ].map(n => n.toFixed(0))

            return (
              <Modal Dialog={ModalFullscreenDialog}>
                <ModalBlockLightbox id={params.id} ids={ids} />
              </Modal>
            )
          })}
        />
      )}
    </>
  )
}
