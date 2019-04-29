import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import axios from 'axios'

import TopBar from 'v2/components/TopBar'
import FixedWrapper from 'v2/components/UI/FixedWrapper'
import BottomBanner from 'v2/components/BottomBanner'

import WithSerializedMe from 'v2/hocs/WithSerializedMe'

import globalNavElementsQuery from 'v2/components/GlobalNavElements/queries/globalNavElements'

// Includes
// - TopBar (logged-in/out)
// - Banners (logged-in)
// - LoggedOutCTA (logged-out) // TODO
class GlobalNavElements extends PureComponent {
  static propTypes = {
    scheme: PropTypes.oneOf(['DEFAULT', 'GROUP']),
    serializedMe: PropTypes.shape({
      id: PropTypes.number,
    }),
  }

  static defaultProps = {
    scheme: 'DEFAULT',
    serializedMe: null,
  }

  signOut = err => {
    if (!err.graphQLErrors) return

    const {
      extensions: { code },
    } = err.graphQLErrors[0]

    if (code !== 'UNAUTHORIZED') return

    // `UNAUTHORIZED` === Log out the user
    axios({ method: 'GET', url: '/me/sign_out' }).then(() =>
      window.location.reload()
    )
  }

  render() {
    const { scheme, serializedMe } = this.props
    const isLoggedOut = !serializedMe
    const isLoggedIn = !isLoggedOut

    return (
      <Query
        query={globalNavElementsQuery}
        ssr={false}
        skip={isLoggedOut}
        onError={this.signOut}
      >
        {({ data }) => {
          const components = []

          // Merge client-side fetched me data along with the serialized data
          const me = isLoggedIn
            ? { ...serializedMe, ...((data && data.me) || {}) }
            : null

          components.push(
            <FixedWrapper key="TopBar" top>
              <TopBar scheme={scheme} me={me} />
            </FixedWrapper>
          )

          if (isLoggedIn && me.banner) {
            components.push(
              <BottomBanner key="BottomBanner" banner={me.banner} />
            )
          }

          return components
        }}
      </Query>
    )
  }
}

export default WithSerializedMe(GlobalNavElements)
