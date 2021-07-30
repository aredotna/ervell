/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogPostAssetsQuery
// ====================================================

export interface BlogPostAssetsQuery_blogPost_body_links_assets_block_sys {
  __typename: "Sys";
  id: string;
}

export interface BlogPostAssetsQuery_blogPost_body_links_assets_block {
  __typename: "Asset";
  sys: BlogPostAssetsQuery_blogPost_body_links_assets_block_sys;
  small: string | null;
  medium: string | null;
  large: string | null;
  description: string | null;
}

export interface BlogPostAssetsQuery_blogPost_body_links_assets {
  __typename: "BlogPostBodyAssets";
  block: (BlogPostAssetsQuery_blogPost_body_links_assets_block | null)[];
}

export interface BlogPostAssetsQuery_blogPost_body_links {
  __typename: "BlogPostBodyLinks";
  assets: BlogPostAssetsQuery_blogPost_body_links_assets;
}

export interface BlogPostAssetsQuery_blogPost_body {
  __typename: "BlogPostBody";
  links: BlogPostAssetsQuery_blogPost_body_links;
}

export interface BlogPostAssetsQuery_blogPost {
  __typename: "BlogPost";
  body: BlogPostAssetsQuery_blogPost_body | null;
}

export interface BlogPostAssetsQuery {
  blogPost: BlogPostAssetsQuery_blogPost | null;
}

export interface BlogPostAssetsQueryVariables {
  id: string;
}
