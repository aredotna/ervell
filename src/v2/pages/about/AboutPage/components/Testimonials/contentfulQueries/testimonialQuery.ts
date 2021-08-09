import { gql } from '@apollo/client'

export const TestimonialsQuery = gql`
  query Testimonials {
    testimonialsCollection(order: sys_firstPublishedAt_ASC) {
      items {
        testimonial
        link
      }
    }
  }
`
