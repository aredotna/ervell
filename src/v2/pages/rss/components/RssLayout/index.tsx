import React, { JSXElementConstructor } from 'react'
import { ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const rssElement = (name: string) => p => {
  const { children, ...props } = p
  return React.createElement(name, props, children)
}

const Channel = rssElement('channel')

interface RssLayoutProps {
  title: string
  link: string
  atomLink: string
  description?: string
  lastBuildDate: string
}

export const RssLayout: React.FC<RssLayoutProps> = ({
  title,
  link,
  description,
  lastBuildDate,
  children,
}) => {
  const html = `
    <title>${title}</title>
    <link>${link}</link>
    <description>${description || ''}</description>
    <lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>
    ${renderToStaticMarkup(
      children as ReactElement<any, string | JSXElementConstructor<any>>
    )}
  `
  return <Channel dangerouslySetInnerHTML={{ __html: html }} />
}

export default RssLayout
