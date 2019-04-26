import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import isLoggedInQuery from 'v2/hocs/WithLoginStatus/queries/isLoggedIn'

const withLoginStatus = WrappedComponent => {
  class WithLoginStatus extends Component {
    static propTypes = {
      data: PropTypes.shape({
        loginStatus: PropTypes.shape({
          isLoggedIn: PropTypes.bool,
        }),
      }),
    }

    static defaultProps = {
      data: {
        loginStatus: {
          isLoggedIn: false,
        },
      },
    }

    render() {
      const {
        data: { loginStatus },
        ...rest
      } = this.props
      const isLoggedIn = loginStatus && loginStatus.isLoggedIn

      return <WrappedComponent isLoggedIn={isLoggedIn} {...rest} />
    }
  }

  return graphql(isLoggedInQuery)(WithLoginStatus)
}

export default withLoginStatus
