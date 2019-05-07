import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet-async'

const Head = ({ children, ...rest }) => (
  <Helmet defaultTitle="Are.na" {...rest}>
    {children}
  </Helmet>
)

Head.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Head
