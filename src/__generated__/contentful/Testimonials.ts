/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Testimonials
// ====================================================

export interface Testimonials_testimonialsCollection_items {
  __typename: "Testimonials";
  testimonial: string | null;
  link: string | null;
}

export interface Testimonials_testimonialsCollection {
  __typename: "TestimonialsCollection";
  items: (Testimonials_testimonialsCollection_items | null)[];
}

export interface Testimonials {
  testimonialsCollection: Testimonials_testimonialsCollection | null;
}
