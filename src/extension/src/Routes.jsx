import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import ExtensionLogin from 'extension/src/components/ExtensionLogin'
import Blocks from 'v2/components/Bookmarklet/Blocks'
import EditBlock from 'v2/components/Bookmarklet/EditBlock'
import Extension from 'v2/components/Bookmarklet/Extension'

import parseRoute from 'v2/util/parseRoute'
import withLoginStatus from 'v2/hocs/WithLoginStatus'

const Routes = ({ isLoggedIn }) => (
  <Extension>
    <Switch>
      {!isLoggedIn && <Route path="/" component={ExtensionLogin} />}

      {isLoggedIn && (
        <React.Fragment>
          <Route path="/blocks" component={Blocks} />
          <Route path="/edit" component={EditBlock} />
          <Route
            exact
            path="/index.html"
            render={parseRoute(({ query }) => (
              <Blocks query={query} />
            ))}
          />
        </React.Fragment>
      )}
    </Switch>
  </Extension>
)

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
}

export default withLoginStatus(Routes)
