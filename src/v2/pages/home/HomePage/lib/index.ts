import { initApolloClient } from 'v2/apollo'

import CONFIG from 'config.coffee'
import lastFeaturedChannels from './queries/lastFeaturedChannels'
import { LastFeaturedChannels } from '__generated__/LastFeaturedChannels'

const client = initApolloClient({ token: CONFIG.X_APP_TOKEN })

client
  .query<LastFeaturedChannels>({ query: lastFeaturedChannels })
  .then(result => {
    const ids = result.data.channel.contents.map(
      content => content.__typename === 'Channel' && content.id
    )
  })
