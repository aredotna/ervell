import { gql } from '@apollo/client'

export const AboutPageContents = gql`
  query AboutPageContents {
    aboutPage(id: "3dHOu4WerWZkkiBw5jeq4r") {
      businessModelAndPosition {
        businessModelContent {
          json
        }
      }
      team {
        teamDescription {
          json
        }
      }
    }
  }
`
