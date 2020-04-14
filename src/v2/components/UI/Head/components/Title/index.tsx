import React from 'react'
import { unescape } from 'underscore'

import Head from 'v2/components/UI/Head'

export const TITLE_TEMPLATE = '%s — Are.na'

interface Props {
  children: string | string[]
}

export const Title: React.FC<Props> = ({ children }) => {
  const string = children instanceof Array ? children.join(' ') : children
  const title = TITLE_TEMPLATE.replace('%s', unescape(string))

  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:title" content={title} />
      <meta property="og:title" content={title} />
    </Head>
  )
}

export default Title
