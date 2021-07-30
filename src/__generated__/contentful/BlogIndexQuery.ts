/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogIndexQuery
// ====================================================

export interface BlogIndexQuery_blogPostCollection_items_image {
  __typename: "Asset";
  small: string | null;
  medium: string | null;
  large: string | null;
}

export interface BlogIndexQuery_blogPostCollection_items_author {
  __typename: "Author";
  name: string | null;
}

export interface BlogIndexQuery_blogPostCollection_items {
  __typename: "BlogPost";
  slug: string | null;
  title: string | null;
  category: string | null;
  image: BlogIndexQuery_blogPostCollection_items_image | null;
  previewText: string | null;
  displayDate: any | null;
  author: BlogIndexQuery_blogPostCollection_items_author | null;
}

export interface BlogIndexQuery_blogPostCollection {
  __typename: "BlogPostCollection";
  total: number;
  items: (BlogIndexQuery_blogPostCollection_items | null)[];
}

export interface BlogIndexQuery {
  blogPostCollection: BlogIndexQuery_blogPostCollection | null;
}
