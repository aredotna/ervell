import React, { useEffect } from 'react'
import { useQuery } from 'react-apollo'
import axios from 'axios'

import { TopBar } from 'v2/components/TopBar'
import FixedWrapper from 'v2/components/UI/FixedWrapper'
import BottomBanner from 'v2/components/BottomBanner'

import globalNavElementsQuery from 'v2/components/GlobalNavElements/queries/globalNavElements'
import { BrowserRouter } from 'react-router-dom'
import { GlobalNavElements as GlobalNavElementsType } from '__generated__/GlobalNavElements'
import useLoginStatus from 'v2/hooks/useLoginStatus'

interface GlobalNavElementsProps {
  scheme: 'DEFAULT' | 'GROUP'
}

export const GlobalNavElements: React.FC<GlobalNavElementsProps> = ({
  scheme,
}) => {
  const { isLoggedIn } = useLoginStatus()
  const { data, error } = useQuery<GlobalNavElementsType>(
    globalNavElementsQuery,
    { skip: !isLoggedIn }
  )

  useEffect(() => {
    if (error && error.graphQLErrors && isLoggedIn) {
      const {
        extensions: { code },
      } = error.graphQLErrors[0]

      if (code !== 'UNAUTHORIZED') return

      // `UNAUTHORIZED` === Log out the user
      axios({ method: 'POST', url: '/me/sign_out' }).then(() =>
        window.location.reload()
      )
    }
  }, [data, error, isLoggedIn])

  const components = []

  components.push(
    <FixedWrapper key="TopBar" top>
      <TopBar scheme={scheme} me={data?.me} />
    </FixedWrapper>
  )

  if (isLoggedIn && data?.me?.banner) {
    components.push(<BottomBanner key="BottomBanner" banner={data.me.banner} />)
  }

  return <>{components}</>
}

export const GlobalNavElementsWithRouter = () => {
  return (
    <BrowserRouter>
      <GlobalNavElements scheme="DEFAULT" />
    </BrowserRouter>
  )
}
