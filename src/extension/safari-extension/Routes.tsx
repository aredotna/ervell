import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ExtensionLogin from 'extension/src/components/ExtensionLogin'
import Blocks from 'v2/components/Bookmarklet/components/Blocks'
import EditBlock from 'v2/components/Bookmarklet/components/EditBlock'
import Extension from 'v2/components/Bookmarklet/components/Extension'

import withLoginStatus from 'v2/hocs/WithLoginStatus'

interface RoutesProps {
  isLoggedIn: boolean
}

const ExtensionRoutes: React.FC<RoutesProps> = ({ isLoggedIn }) => (
  <Extension>
    <Routes>
      {!isLoggedIn && <Route path="/" element={ExtensionLogin} />}

      {isLoggedIn && (
        <React.Fragment>
          <Route path="/edit" element={<EditBlock isSafari />} />
          <Route
            path="/"
            element={renderProps => {
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
    </Routes>
  </Extension>
)

export default withLoginStatus(ExtensionRoutes)
