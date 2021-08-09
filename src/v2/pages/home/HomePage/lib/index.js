const axios = require('axios').default
const CONFIG = require('../../../../../config')

// eslint-disable-next-line no-undef
const fs = require('fs')

const lastFeaturedChannels = `
  query LastFeaturedChannels {
    channel(id: "featured-channels-c1f30sunbl4") {
      contents: blokks(
        per: 5
        sort_by: POSITION
        direction: DESC
        type: CHANNEL
      ) {
        ... on Channel {
          to_s
          id
        }
      }
    }
  }
`

const channelContents = `
  query ChannelContents($id: ID!) {
    channel(id: $id) {
      blokks(per: 10, sort_by: POSITION, direction: ASC) {
        ... on Model {
          id
        }
      }
    }
  }
`

const url = `${CONFIG.APP_URL}/graphql`

let channelIds
let blockIds

axios
  .post(url, { query: lastFeaturedChannels })
  .then(({ data: { data } }) => {
    channelIds = data.channel.contents.map(c => c.id)
    return Promise.all(
      channelIds.map(id => {
        return axios.post(url, { query: channelContents, variables: { id } })
      })
    )
  })
  .then(response => {
    blockIds = response
      .map(r => r.data.data.channel.blokks.map(b => b.id))
      .flat(1)

    const json = JSON.stringify({ channelIds, blockIds })

    console.log('pwd', process.cwd())
    fs.writeFileSync(
      `${process.cwd()}/src/v2/pages/home/HomePage/components/DesireLine/pathData.json`,
      json
    )
  })
  .catch(err => {
    console.log('error', err)
  })
