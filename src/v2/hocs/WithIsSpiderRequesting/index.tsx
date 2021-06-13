import React, { useMemo } from 'react'

import isSpiderRequestingQuery from 'v2/hocs/WithIsSpiderRequesting/queries/isSpiderRequesting'
import { useApolloClient } from '@apollo/client'
import { IsSpiderRequestingQuery } from '__generated__/IsSpiderRequestingQuery'

const withIsSpiderRequesting = <
  ComponentProps extends { isSpiderRequesting: boolean }
>(
  WrappedComponent: React.ComponentType<ComponentProps>
): React.FC<Omit<ComponentProps, 'isSpiderRequesting'>> => {
  return props => {
    const client = useApolloClient()
    const {
      sharify: { isSpiderRequesting },
    } = useMemo(() => {
      return client.readQuery<IsSpiderRequestingQuery>({
        query: isSpiderRequestingQuery,
      })
    }, [client])

    const wrappedComponentProps = {
      ...props,
      isSpiderRequesting,
    } as ComponentProps

    return <WrappedComponent {...wrappedComponentProps} />
  }
}

export default withIsSpiderRequesting
