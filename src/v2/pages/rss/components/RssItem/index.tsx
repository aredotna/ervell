import React from 'react'
import { ReactElement } from 'react'

const rssElement = (name: string) => p => {
  const { children, ...props } = p
  return React.createElement(name, props, children)
}

const Item = rssElement('item')

interface RssItemProps {
  title?: string
  link?: string
  pubDate?: string
  guid?: string
  source?: string
  description?: ReactElement
}

export const RssItem: React.FC<RssItemProps> = ({
  title,
  link,
  pubDate,
  guid,
  description,
}) => {
  const html = `
    <title>${title}</title>
    <link>${link}</link>
    <pubDate>${new Date(pubDate).toUTCString()}</pubDate>
    <guid>${guid}</guid>
    <description>
      <![CDATA[${description}]]>
    </description>
  `

  return <Item dangerouslySetInnerHTML={{ __html: html }} />
}
