import { gql } from '@apollo/client'

export const RoadmapContents = gql`
  query RoadmapContents {
    roadmap(id: "XIpMMSAIWz0OlWhW7GEUy") {
      sys {
        publishedAt
      }
      rawMrr
      rawGoalMrr
      goalDate
      statsRawMaMs
      statsRawCustomers
      statsRawConnections
      statsPremiumRevenue
      statsPatronRevenue
      businessRevenue {
        json
      }
      businessEthics {
        json
      }
      businessCommunity {
        json
      }
      businessTeam {
        json
      }
      productInProgress {
        json
      }
      productUpNext {
        json
      }
      productOnTheHorizon {
        json
      }
      productCompleted {
        json
      }
    }
  }
`
