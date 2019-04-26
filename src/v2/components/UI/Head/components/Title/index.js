import React from 'react'
import PropTypes from 'prop-types'

import Head from 'v2/components/UI/Head'

export const TITLE_TEMPLATE = 'Are.na / %s'

const Title = ({ children }) => {
  const title = TITLE_TEMPLATE.replace('%s', children)

  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:title" content={title} />
      <meta property="og:title" content={title} />
    </Head>
  )
}

Title.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Title
