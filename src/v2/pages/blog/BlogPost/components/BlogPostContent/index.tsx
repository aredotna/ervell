import React from 'react'
import { useQuery } from '@apollo/client'

import BLOG_POST_ASSETS_QUERY from 'v2/pages/blog/BlogPost/contentfulQueries/BlogPostByID'
import { ContentfulContent } from 'v2/components/ContentfulContent'

interface BlogPostContentProps {
  id: string
  content: any
  defaultFontSize?: number
  divId?: string
}

export const BlogPostContent: React.FC<BlogPostContentProps> = ({
  content,
  id,
  defaultFontSize = 4,
  divId = '',
}) => {
  const { data: embedData } = useQuery(BLOG_POST_ASSETS_QUERY, {
    context: { clientName: 'contentful' },
    variables: { id },
  })

  return (
    <ContentfulContent
      id={divId}
      content={content}
      embedData={embedData}
      defaultFontSize={defaultFontSize}
    />
  )
}
