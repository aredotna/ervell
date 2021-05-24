import { InMemoryCache, InMemoryCacheConfig, TypePolicy } from '@apollo/client'
import Cookies from 'cookies-js'
import possibleTypes from 'v2/apollo/possibleTypes.json'

const isClientSide = typeof window !== 'undefined'

/*
 * Type policies
 */

// A field that doesn't contain any identifiable information,
// and can only be associated with a larger type if it's
// embedded inside of it. If new subfields are queried for,
// it's ok to keep the previous fields from other queries.
const nonNormalizedMergeableObject: TypePolicy = {
  keyFields: false,
  merge(existing, incoming) {
    return {
      ...existing,
      ...incoming,
    }
  },
}

/*
 * Create the InMemoryCache
 */

export function getCache({
  cookies,
  sharifyData,
}: {
  cookies?: Record<string, any>
  sharifyData?: Record<string, any>
} = {}): InMemoryCache {
  const cacheConfig: InMemoryCacheConfig = {
    possibleTypes: possibleTypes,
    typePolicies: {
      /*
       * nonNormalizedMergeableObject
       */
      BlockCounts: nonNormalizedMergeableObject,
      BlockCan: nonNormalizedMergeableObject,
      ChannelCan: nonNormalizedMergeableObject,
      ChannelCounts: nonNormalizedMergeableObject,
      ChannelMembershipCan: nonNormalizedMergeableObject,
      ChannelShare: nonNormalizedMergeableObject,
      ClientCurrentRoute: nonNormalizedMergeableObject,
      ClientLoginStatus: nonNormalizedMergeableObject,
      ClientSerializedMe: nonNormalizedMergeableObject,
      CommentCan: nonNormalizedMergeableObject,
      ConnectableCan: nonNormalizedMergeableObject,
      ConnectableSource: nonNormalizedMergeableObject,
      ConnectionCan: nonNormalizedMergeableObject,
      Dimensions: nonNormalizedMergeableObject,
      Feed: nonNormalizedMergeableObject,
      GroupCan: nonNormalizedMergeableObject,
      GroupCounts: nonNormalizedMergeableObject,
      GroupMembershipCan: nonNormalizedMergeableObject,
      IndexedChannels: nonNormalizedMergeableObject,
      Invoice: nonNormalizedMergeableObject,
      MeCounts: nonNormalizedMergeableObject,
      MeFlags: nonNormalizedMergeableObject,
      MeSettings: nonNormalizedMergeableObject,
      Policy: nonNormalizedMergeableObject,
      Searches: nonNormalizedMergeableObject,
      UserCan: nonNormalizedMergeableObject,
      UserCounts: nonNormalizedMergeableObject,
    },
  }

  /*
   * Custom type policies
   */

  if (cookies) {
    cacheConfig.typePolicies.ClientCookies = {
      keyFields: [],
      fields: {
        get(_existing, { args }) {
          return isClientSide
            ? Cookies.get(args.name)
            : cookies[args.name] || null
        },
      },
    }
  }

  if (sharifyData) {
    cacheConfig.typePolicies.ClientSharify = {
      keyFields: [],
      fields: {
        get(_existing, { args }) {
          const value = sharifyData[args.name]
          return value ? value : null
        },
      },
    }
  }

  return new InMemoryCache(cacheConfig)
}
