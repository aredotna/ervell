## Idea

An asynchronous job that runs once a day, pulls n latest channels from the featured channels list, finds a block with a lot of connections, gets a channel that has over n number of blocks and then repeats the process n times until we have a chain of a certain length.

## Queries

```
{
  channel(id: "featured-channels-c1f30sunbl4") {
    contents: blokks(per: 5) {
      ... on Channel {
        to_s
        id
        blocks: blokks(per: 5) {
          __typename
          ... on Model {
            id
          }

          ... on ConnectableInterface {
            channels(per: 5) {
              to_s
              id
              slug
            }
          }
        }
      }
    }
  }
}

OR

{
  channel(id: "featured-channels-c1f30sunbl4") {
    contents: blokks(per: 5, sort_by: POSITION, direction: DESC, type: CHANNEL) {
      ... on Channel {
        to_s
        id
      }
    }
  }
}

for each channel

{
  channel(id: slug) {
    blokks(per: 10, sort_by: CONNECTION_COUNT, direction: ASC) {
      ... on ConnectableInterface {
        channels(per: 10, sort_by: BLOCK_COUNT)
      }
    }
  }
}

```

### Final data should look like:

```
{
  paths: [
    {
      key: "first-channel-slug"
      steps: [
        {
          type: "block-to-channel",
          # block info
          connection: {
            # connection info
          }
        }
        {
          type: "connecting-channel",
          # channel info
        },
        {
          type: "block-to-channel"
          # block info
          connection: {
            # connection info
          }
        }
      ]
    }
  ]
}
```
