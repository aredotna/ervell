import sharify from 'sharify'

import mediator from 'lib/mediator.coffee'
import UIState from 'models/ui_state.coffee'
import CurrentUser from 'models/current_user.coffee'

// `backbone.localstorage` references window which causes issues with SSR
let RecentConnections
if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  RecentConnections = require('collections/recent_connections.coffee')
}

export default () => {
  const {
    data: { CURRENT_USER },
  } = sharify

  mediator.shared = mediator.shared || {}
  mediator.shared.state =
    mediator.shared.state || new UIState({ view_mode: 'grid' })
  mediator.shared.current_user =
    mediator.shared.current_user || new CurrentUser(CURRENT_USER)
  mediator.shared.recent_connections =
    mediator.shared.recent_connections || new RecentConnections()
}
