/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EssaysCommunity
// ====================================================

export interface EssaysCommunity_blogPostCollection_items_image {
  __typename: "Asset";
  url: string | null;
}

export interface EssaysCommunity_blogPostCollection_items {
  __typename: "BlogPost";
  slug: string | null;
  category: string | null;
  title: string | null;
  image: EssaysCommunity_blogPostCollection_items_image | null;
}

export interface EssaysCommunity_blogPostCollection {
  __typename: "BlogPostCollection";
  items: (EssaysCommunity_blogPostCollection_items | null)[];
}

export interface EssaysCommunity_walkthroughCollection_items_details {
  __typename: "WalkthroughDetails";
  json: any;
}

export interface EssaysCommunity_walkthroughCollection_items {
  __typename: "Walkthrough";
  nextEvent: any | null;
  details: EssaysCommunity_walkthroughCollection_items_details | null;
}

export interface EssaysCommunity_walkthroughCollection {
  __typename: "WalkthroughCollection";
  limit: number;
  items: (EssaysCommunity_walkthroughCollection_items | null)[];
}

export interface EssaysCommunity {
  blogPostCollection: EssaysCommunity_blogPostCollection | null;
  walkthroughCollection: EssaysCommunity_walkthroughCollection | null;
}
