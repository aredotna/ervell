import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import parseRoute from 'v2/util/parseRoute'

import Extension from 'extension/src/components/Extension'
import withLoginStatus from 'v2/hocs/WithLoginStatus'

import BookmarkletLogin from 'v2/components/BookmarkletLogin'
import Blocks from 'extension/src/components/Blocks'
import EditBlock from 'extension/src/components/EditBlock'

const Routes = ({ isLoggedIn }) => {
  return (
    <Extension>
      <Switch>
        {!isLoggedIn && (
          <Route path="/save/:content" component={BookmarkletLogin} />
        )}

        {isLoggedIn && (
          <React.Fragment>
            <Route path="/save/:content/edit" component={EditBlock} />
            <Route
              exact
              path="/save/:content"
              render={parseRoute(({ params }) => (
                <Blocks query={params} />
              ))}
            />
          </React.Fragment>
        )}
      </Switch>
    </Extension>
  )
}

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
}

export default withLoginStatus(Routes)
