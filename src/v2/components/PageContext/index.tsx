import React from 'react'
import {
  BaseConnectableTypeEnum,
  FollowableTypeEnum,
} from '__generated__/globalTypes'

type PageType =
  | {
      type: FollowableTypeEnum.CHANNEL
      id: string
    }
  | {
      type: FollowableTypeEnum.GROUP
      id: string
    }
  | {
      type: FollowableTypeEnum.USER
      id: string
    }
  | {
      type: BaseConnectableTypeEnum.BLOCK
    }

export interface PageContextType {
  page?: PageType
  setPage: (page: PageType) => void
}

const PageContext = React.createContext<PageContextType>({
  setPage: () => {},
})

interface PageContextProviderProps {
  initialPage?: PageType
}

export const PageContextProvider: React.FC<PageContextProviderProps> = ({
  children,
  initialPage,
}) => {
  const [page, setPage] = React.useState<PageType>(initialPage)

  return (
    <PageContext.Provider
      value={{
        page,
        setPage,
      }}
    >
      {children}
    </PageContext.Provider>
  )
}

export default PageContextProvider
