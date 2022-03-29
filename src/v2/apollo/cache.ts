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
  { args: { page = 1, per = 25 } = {} }
) => {
  /*
   * Ensure args and data is properly set up
   */

  if (!Array.isArray(incoming)) {
    throw new Error("incoming isn't an array")
  }
  if (page === 0) {
    throw new Error('page is 0')
  }
  if (typeof per !== 'number') {
    throw new Error("per isn't a number")
  }

  // New array to be returned
  const newData = []

  // Index that the incoming data starts at in the newData array
  const incomingStartingIndex = (page - 1) * per

  const incomingEndingIndex =
    incomingStartingIndex +
    Math.min(Array.isArray(incoming) ? incoming.length : 0, per) -
    1

  // Length of the new array
  const newDataLength = Math.max(
    Array.isArray(existing) ? existing.length : 0,
    incomingEndingIndex + 1
  )

  for (let i = 0; i < newDataLength; i++) {
    const isInIncomingWindow =
      i >= incomingStartingIndex && i <= incomingEndingIndex

    if (isInIncomingWindow) {
      const incomingItem = incoming[i - incomingStartingIndex]

      // If the incomingItem is undefined, this probably means
      // that the incoming data is private to the current user.
      // Apollo cache squashes undefined elements in an array,
      // so set them to null instead.
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
          search: {
            keyArgs: everythingExcept('page', 'per'),
            merge: paginationWithPageAndPer,
          },
        },
      },

      Channel: {
        fields: {
          filter: {
            keyArgs: everythingExcept('page', 'per'),
            merge: paginationWithPageAndPer,
          },
          blokks: {
            keyArgs: everythingExcept('page', 'per'),
            merge: paginationWithPageAndPer,
          },
        },
      },

      User: {
        fields: {
          contents: {
            keyArgs: everythingExcept('page', 'per'),
            merge: paginationWithPageAndPer,
          },
          kontents: {
            keyArgs: everythingExcept('page', 'per'),
            merge: paginationWithPageAndPer,
          },
          channels: {
            keyArgs: everythingExcept('page', 'per'),
            merge: paginationWithPageAndPer,
          },
        },
      },

      Group: {
        fields: {
          channels: {
            keyArgs: everythingExcept('page', 'per'),
            merge: paginationWithPageAndPer,
          },
        },
      },

      Search: {
        fields: {
          contents: {
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
      Connection: nonNormalizedMergeableObject,
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
            ? Cookies.get(args.name) || null
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
