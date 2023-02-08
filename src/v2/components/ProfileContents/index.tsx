import React, { useCallback, useEffect } from 'react'
import { FetchPolicy, useQuery } from '@apollo/client'

import useIsSpiderRequesting from 'v2/hooks/useIsSpiderRequesting'
import useMergeState from 'v2/hooks/useMergeState'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import SearchInput from '../UI/SearchInput'
import BlocksLoadingIndicator from 'v2/components/UI/BlocksLoadingIndicator'
import Grid from 'v2/components/UI/Grid'
import Cell from 'v2/components/Cell'

import constants from 'v2/styles/constants'

import profileContentsQuery from 'v2/components/ProfileContents/queries/profileContents'

import { ConnectableTypeEnum, SearchSorts } from '__generated__/globalTypes'
import { ProfileContentsQuery } from '__generated__/ProfileContentsQuery'
import usePrevious from 'v2/hooks/usePrevious'

interface ProfileContentsProps {
  id: string | number
  type?: ConnectableTypeEnum
  sort: SearchSorts
  fetchPolicy: FetchPolicy
  seed?: number
}

interface ProfileContentsState {
  page: number
  per: number
  hasMore: boolean
  q?: string
}

export const ProfileContents: React.FC<ProfileContentsProps> = ({
  id,
  type,
  sort,
  fetchPolicy,
  seed,
}) => {
  const isSpider = useIsSpiderRequesting()

  const [{ page, per, q, hasMore }, setState] = useMergeState<
    ProfileContentsState
  >({
    page: 1,
    per: 12,
    hasMore: true,
    q: null,
  })

  const { data, loading, error, fetchMore } = useQuery<ProfileContentsQuery>(
    profileContentsQuery,
    {
      variables: {
        id,
        sort,
        per,
        page,
        type,
        seed,
        q,
      },
      ssr: isSpider,
      fetchPolicy,
    }
  )

  const resetQuery = useCallback(
    (query: string) => {
      const q = query === '' ? null : query
      setState({
        page: 1,
        per: 12,
        hasMore: true,
        q,
      })
    },
    [setState]
  )

  const prevType = usePrevious(type)
  const prevSort = usePrevious(sort)

  useEffect(() => {
    if (prevType !== type || sort != prevSort) {
      resetQuery('')
    }
  }, [prevType, type, sort, prevSort])

  const loadMore = useCallback(() => {
    fetchMore({
      variables: { page: page + 1, per },
    }).then(({ errors, data }) => {
      const {
        identity: { identifiable },
      } = data

      if (identifiable.__typename == 'Group') {
        return null
      }

      const {
        contents: { length },
      } = identifiable

      const hasMore = !errors && length > 0 && length >= per

      setState({
        page: page + 1,
        hasMore,
      })
    })
  }, [page, per, fetchMore, setState])

  if (error) {
    return <ErrorAlert>{error.message}</ErrorAlert>
  }

  if (loading) {
    return (
      <div>
        <SearchInput
          query={q}
          onDebouncedQueryChange={resetQuery}
          placeholder={`Filter ${{ BLOCK: 'blocks' }[type] ||
            'blocks and channels'}`}
          mb={6}
          mr={[
            constants.blockGutter,
            constants.doubleBlockGutter,
            constants.doubleBlockGutter,
          ]}
          ml={[constants.blockGutter, 0, 0]}
          border={0}
        />
        <BlocksLoadingIndicator />
      </div>
    )
  }

  const {
    identity: { identifiable },
  } = data

  if (identifiable.__typename == 'Group') {
    return null
  }

  const { name, contents } = identifiable

  return (
    <div>
      <SearchInput
        query={q}
        onDebouncedQueryChange={resetQuery}
        placeholder={`Filter ${name}’s ${{ BLOCK: 'blocks' }[type] ||
          'blocks and channels'}`}
        mb={6}
        mr={[
          constants.blockGutter,
          constants.doubleBlockGutter,
          constants.doubleBlockGutter,
        ]}
        ml={[constants.blockGutter, 0, 0]}
        border={0}
      />

      {loading && <BlocksLoadingIndicator />}

      {!loading && contents.length > 0 && (
        <Grid
          pageStart={1}
          threshold={800}
          initialLoad={false}
          loader={<BlocksLoadingIndicator key="loading" />}
          hasMore={contents.length >= per && hasMore}
          loadMore={loadMore}
        >
          {contents.map(blokk => {
            if (!blokk?.__typename) {
              return null
            }

            return (
              <Cell.Konnectable
                key={`${blokk.__typename}_${blokk.id}`}
                konnectable={blokk}
                context={contents}
              />
            )
          })}
        </Grid>
      )}
    </div>
  )
}

export default ProfileContents
