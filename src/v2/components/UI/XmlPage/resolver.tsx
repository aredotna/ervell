import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import XmlPage from 'v2/components/UI/XmlPage'

export default ({ apolloRes }) => {
  const xml = <XmlPage content={apolloRes.html} />

  return `<?xml version="1.0" encoding="UTF-8" ?>\n${renderToStaticMarkup(xml)}`
}
