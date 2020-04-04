import React from 'react'
import { Switch, Route } from 'react-router-dom'
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

export const Routes = () => {
  return (
    <Switch>
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
  )
}
