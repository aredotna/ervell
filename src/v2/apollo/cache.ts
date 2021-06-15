import { InMemoryCache, InMemoryCacheConfig, TypePolicy } from '@apollo/client'
import Cookies from 'cookies-js'
import possibleTypes from 'v2/apollo/possibleTypes.json'
import {
  KeyArgsFunction,
  FieldMergeFunction,
} from '@apollo/client/cache/inmemory/policies'

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
 * keyArgs
 */

// Create a new cache entity for a field, based on the field's args _except_
// for the ones passed into this function
const everythingExcept = (
  ...fieldsToExcludeArray: Array<string>
): KeyArgsFunction => {
  const fieldsToExclude = new Set(fieldsToExcludeArray)

  return args => {
    if (args === null) {
      throw new Error('args is null')
    }

    const keyArgs: Array<string> = []

    for (const key of Object.keys(args)) {
      if (!fieldsToExclude.has(key)) {
        keyArgs.push(key)
      }
    }

    return keyArgs
  }
}

/*
 * Field merge functions
 */

// Merge data together based on a pagination system based on a given `page`,
// and a given number `per` page. Must adhere to these specific arg names.
const paginationWithPageAndPer: FieldMergeFunction<any, any> = (
  existing,
  incoming,
  { args }
) => {
  /*
   * Ensure args and data is properly set up
   */

  if (!args) {
    throw new Error('args not given')
  }
  if (!Array.isArray(incoming)) {
    throw new Error("incoming isn't an array")
  }
  if (typeof args?.page !== 'number') {
    throw new Error("page isn't a number")
  }
  if (args.page === 0) {
    throw new Error('page is 0')
  }
  if (typeof args?.per !== 'number') {
    throw new Error("per isn't a number")
  }

  // New array to be returned
  const newData = []

  // Length of the new array
  const newDataLength = Math.max(
    Array.isArray(existing) ? existing.length : 0,
    args.page * args.per
  )

  // Index that the incoming data starts at in the newData array
  const incomingStartingIndex = (args.page - 1) * args.per

  for (let i = 0; i < newDataLength; i++) {
    const isInIncomingWindow =
      i >= incomingStartingIndex && i < args.page * args.per

    if (isInIncomingWindow) {
      const incomingItem = incoming[i - incomingStartingIndex]

      // are.na sometimes doesn't return the amount of items
      // from the per argument. Set to null instead of undefined so that
      // the undefined item doesn't get squashed.
      if (incomingItem === undefined) {
        newData[i] = null
      } else {
        newData[i] = incomingItem
      }
    } else if (Array.isArray(existing) && i < existing.length) {
      newData[i] = existing[i]
    } else {
      newData[i] = null
    }
  }

  return newData
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
      Query: {
        fields: {
          exxplore: {
            keyArgs: everythingExcept('page', 'per'),
            merge: paginationWithPageAndPer,
          },
        },
      },

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
