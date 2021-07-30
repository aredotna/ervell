/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogPostBySlugQuery
// ====================================================

export interface BlogPostBySlugQuery_blogPostCollection_items_sys {
  __typename: "Sys";
  id: string;
}

export interface BlogPostBySlugQuery_blogPostCollection_items_blocksCollection_items_sys {
  __typename: "Sys";
  id: string;
}

export interface BlogPostBySlugQuery_blogPostCollection_items_blocksCollection_items_text {
  __typename: "BlockAndDescriptionText";
  json: any;
}

export interface BlogPostBySlugQuery_blogPostCollection_items_blocksCollection_items {
  __typename: "BlockAndDescription";
  sys: BlogPostBySlugQuery_blogPostCollection_items_blocksCollection_items_sys;
  blockUrl: string | null;
  text: BlogPostBySlugQuery_blogPostCollection_items_blocksCollection_items_text | null;
}

export interface BlogPostBySlugQuery_blogPostCollection_items_blocksCollection {
  __typename: "BlogPostBlocksCollection";
  items: (BlogPostBySlugQuery_blogPostCollection_items_blocksCollection_items | null)[];
}

export interface BlogPostBySlugQuery_blogPostCollection_items_image {
  __typename: "Asset";
  small: string | null;
  medium: string | null;
  large: string | null;
}

export interface BlogPostBySlugQuery_blogPostCollection_items_author_bio {
  __typename: "AuthorBio";
  json: any;
}

export interface BlogPostBySlugQuery_blogPostCollection_items_author {
  __typename: "Author";
  name: string | null;
  bio: BlogPostBySlugQuery_blogPostCollection_items_author_bio | null;
}

export interface BlogPostBySlugQuery_blogPostCollection_items_body {
  __typename: "BlogPostBody";
  json: any;
}

export interface BlogPostBySlugQuery_blogPostCollection_items_footnotes {
  __typename: "BlogPostFootnotes";
  json: any;
}

export interface BlogPostBySlugQuery_blogPostCollection_items_epilogue {
  __typename: "BlogPostEpilogue";
  json: any;
}

export interface BlogPostBySlugQuery_blogPostCollection_items {
  __typename: "BlogPost";
  sys: BlogPostBySlugQuery_blogPostCollection_items_sys;
  slug: string | null;
  title: string | null;
  category: string | null;
  blocksCollection: BlogPostBySlugQuery_blogPostCollection_items_blocksCollection | null;
  image: BlogPostBySlugQuery_blogPostCollection_items_image | null;
  previewText: string | null;
  displayDate: any | null;
  author: BlogPostBySlugQuery_blogPostCollection_items_author | null;
  body: BlogPostBySlugQuery_blogPostCollection_items_body | null;
  footnotes: BlogPostBySlugQuery_blogPostCollection_items_footnotes | null;
  epilogue: BlogPostBySlugQuery_blogPostCollection_items_epilogue | null;
}

export interface BlogPostBySlugQuery_blogPostCollection {
  __typename: "BlogPostCollection";
  items: (BlogPostBySlugQuery_blogPostCollection_items | null)[];
}

export interface BlogPostBySlugQuery {
  blogPostCollection: BlogPostBySlugQuery_blogPostCollection | null;
}

export interface BlogPostBySlugQueryVariables {
  slug: string;
}
