/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: KonnectableImage
// ====================================================

export interface KonnectableImage_original_dimensions {
  __typename: "Dimensions";
  width: number | null;
  height: number | null;
}

export interface KonnectableImage {
  __typename: "Image";
  id: number | null;
  title: string | null;
  href: string | null;
  src: string | null;
  src_1x: string | null;
  src_2x: string | null;
  src_3x: string | null;
  original_dimensions: KonnectableImage_original_dimensions | null;
}
