import React from 'react'
import {
  RssBlock as Block,
  RssBlock_Image,
  RssBlock_Link,
  RssBlock_Text,
} from '__generated__/RssBlock'
import { RssItem } from '../RssItem'

interface RssBlockProps {
  block: Block
}

export const RssBlock: React.FC<RssBlockProps> = ({ block }) => {
  let description

  switch (block.__typename) {
    case 'Embed':
      description = block.embed_html
      break
    case 'Image':
      description = `<a href="${block.href}"><img src="${
        (block as RssBlock_Image).image_url
      }" /></a>`
      break
    case 'Link':
      description = `
        <div>${block.description}</div>
        <a href="${block.href}">
          <img src="${(block as RssBlock_Link).image_url}" />
        </a>`
      break
    case 'Text':
      description = `<p>${(block as RssBlock_Text).content}</p>`
      break
    default:
      description = `<a href="${block.href}">${block.title}</a>`
  }

  return (
    <RssItem
      title={block.title}
      link={block.href}
      pubDate={block.updated_at}
      guid={block.href}
      source={block.source?.url}
      description={description}
    />
  )
}
