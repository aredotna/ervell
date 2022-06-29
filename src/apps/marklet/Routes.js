import React from 'react'
import { Route, Routes as Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import parseRoute from 'v2/util/parseRoute'

import Extension from 'v2/components/Bookmarklet/components/Extension'
import withLoginStatus from 'v2/hocs/WithLoginStatus'

import Layout from 'v2/components/Bookmarklet/components/Layout'
import CenterStretchBox from 'v2/components/Bookmarklet/components/UI/CenterStretchBox'
import Login from 'v2/components/LoginForm'
import Blocks from 'v2/components/Bookmarklet/components/Blocks'
import EditBlock from 'v2/components/Bookmarklet/components/EditBlock'

import PaneMessenger from 'lib/PaneMessenger'

const Routes = ({ isLoggedIn }) => {
  const messenger = new PaneMessenger(window.top)

  return (
    <Extension>
      <Switch>
        {!isLoggedIn && (
          <Route
            path="/save/:content"
            render={() => (
              <Layout>
                <CenterStretchBox>
                  <Login
                    trackLogin={false}
                    onClose={() => messenger.send({ action: 'close' })}
                  />
                </CenterStretchBox>
              </Layout>
            )}
          />
        )}

        {isLoggedIn && (
          <React.Fragment>
            <Route path="/edit" component={EditBlock} />
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
