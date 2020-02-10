import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ExtensionLogin from 'extension/src/components/ExtensionLogin'
import Blocks from 'v2/components/Bookmarklet/components/Blocks'
import EditBlock from 'v2/components/Bookmarklet/components/EditBlock'
import Extension from 'v2/components/Bookmarklet/components/Extension'

import withLoginStatus from 'v2/hocs/WithLoginStatus'

interface RoutesProps {
  isLoggedIn: boolean
}

const Routes: React.FC<RoutesProps> = ({ isLoggedIn }) => (
  <Extension>
    <Switch>
      {!isLoggedIn && <Route path="/" component={ExtensionLogin} />}

      {isLoggedIn && (
        <React.Fragment>
          <Route path="/edit" render={() => <EditBlock isSafari />} />
          <Route
            path="/"
            render={renderProps => {
              // We manually have to check this here because the
              // initial safari extension pathname is always
              // randomized
              if (renderProps.location.pathname !== '/edit') {
                return <Blocks isSafari />
              }

              return null
            }}
          />
        </React.Fragment>
      )}
    </Switch>
  </Extension>
)

export default withLoginStatus(Routes)
