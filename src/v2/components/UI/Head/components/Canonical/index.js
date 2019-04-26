import React from 'react'
import PropTypes from 'prop-types'

import Head from 'v2/components/UI/Head'

const Canonical = ({ children: url }) => (
  <Head>
    <link rel="canonical" href={url} />
    <meta name="twitter:url" content={url} />
    <meta property="og:url" content={url} />
  </Head>
)

Canonical.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Canonical
