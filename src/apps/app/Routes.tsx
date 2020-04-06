import React from 'react'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import parseRoute from '../../v2/util/parseRoute'

// Feed
import FeedPage from '../../v2/pages/feed/FeedPage'
import NotificationPage from '../../v2/pages/feed/NotificationPage'
// Profile
import ProfilePage from '../../v2/pages/profile/ProfilePage'
// Channel
import ChannelPage from '../../v2/pages/channel/ChannelPage'
import SharedChannelPage from '../../v2/pages/channel/SharedChannelPage'
import ChannelFollowersPage from '../../v2/pages/channel/ChannelFollowersPage'
import EmbeddedChannelPage from '../../v2/pages/channel/EmbeddedChannelPage'
// Block
import BlockPage from '../../v2/pages/block'

// Block modal
import Modal from 'v2/components/UI/Modal/Portal'
import ModalFullscreenDialog from 'v2/components/UI/ModalFullscreenDialog'
import ModalBlockLightbox from 'v2/components/ModalBlockLightbox'

export const Routes = () => {
  const location = useLocation()
  const history = useHistory()
  const background = location.state && JSON.parse(location.state.background)

  console.log('background', background)
  console.log('location', location)

  return (
    <>
      <Switch location={background || location}>
        {/* Feed */}
        <Route exact path="/feed" component={FeedPage} />

        <Route exact path="/notifications" component={NotificationPage} />

        <Route exact path="/" component={FeedPage} />

        {/* Block */}
        <Route
          exact
          path="/block/:id"
          render={parseRoute(({ params }) => (
            <BlockPage id={parseInt(params.id, 10)} />
          ))}
        />

        {/* Profile */}
        <Route
          exact
          path="/:id/:view(all|index|blocks|channels|followers|following|groups)?"
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

        <Route
          exact
          path="/:user_id/:id"
          render={parseRoute(({ params }) => (
            <ChannelPage id={params.id} />
          ))}
        />
      </Switch>

      {background && (
        <Route
          path="/block/:id"
          render={parseRoute(({ params }) => {
            const context = location.state.context
            // get the pathname before the block modal opened
            const pathname = background.pathname

            const ids = [
              ...new Set(
                context
                  .filter(
                    k =>
                      k.__typename !== 'Channel' &&
                      k.__typename !== 'Group' &&
                      k.__typename !== 'User'
                  )
                  .map(k => k.id)
              ),
            ]
            const onClose = () => {
              history.push(pathname)
            }

            return (
              <Modal Dialog={ModalFullscreenDialog}>
                <ModalBlockLightbox
                  id={params.id}
                  ids={ids}
                  onClose={onClose}
                />
              </Modal>
            )
          })}
        />
      )}
    </>
  )
}
