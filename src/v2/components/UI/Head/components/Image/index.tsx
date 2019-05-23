import React from 'react'

import Head from 'v2/components/UI/Head'

interface Props {
  children: string
}

export const Image: React.FC<Props> = ({ children: image_url }) => (
  <Head>
    <meta property="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={image_url} />
    <meta property="og:image" content={image_url} />
  </Head>
)

export default Image
