import React from 'react'
import { Route, Routes, useParams } from 'react-router-dom'

import ExtensionLogin from 'extension/src/components/ExtensionLogin'
import Blocks from 'v2/components/Bookmarklet/components/Blocks'
import EditBlock from 'v2/components/Bookmarklet/components/EditBlock'
import Extension from 'v2/components/Bookmarklet/components/Extension'
import useLoginStatus from 'v2/hooks/useLoginStatus'

const BlocksWithQuery = () => {
  const { query } = useParams()
  return <Blocks query={query} />
}

const ExtRoutes = () => {
  const { isLoggedIn } = useLoginStatus()

  console.log('isLoggedIn', isLoggedIn)

  return (
    <Extension>
      <Routes>
        {!isLoggedIn && <Route path="*" element={<ExtensionLogin />} />}

        {isLoggedIn && (
          <React.Fragment>
            <Route path="/edit" element={<EditBlock />} />
            <Route exact path="/index.html" element={<BlocksWithQuery />} />
          </React.Fragment>
        )}
      </Routes>
    </Extension>
  )
}

export default ExtRoutes
