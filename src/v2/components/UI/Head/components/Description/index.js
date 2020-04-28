import React from 'react'
import PropTypes from 'prop-types'

import Head from 'v2/components/UI/Head'

const Description = ({ children: description }) => (
  <Head>
    <meta name="description" content={description} />
    <meta name="twitter:description" content={description} />
    <meta property="og:description" content={description} />
  </Head>
)

Description.propTypes = {
  children: PropTypes.string,
}

Description.defaultProps = {
  children: 'Are.na is a platform for connecting ideas and building knowledge.',
}

export default Description
