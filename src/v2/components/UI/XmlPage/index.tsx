import React from 'react'

interface XmlPageProps {
  content: any
}

const Rss = p => {
  const { children, ...props } = p
  return React.createElement('rss', { ...props }, children)
}

const XmlPage: React.FC<XmlPageProps> = ({ content }) => {
  return <Rss version="2.0" dangerouslySetInnerHTML={{ __html: content }} />
}

export default XmlPage
