import React, { useEffect } from 'react'

export enum PageTypeEnum {
  CHANNEL = 'CHANNEL',
  GROUP = 'GROUP',
  USER = 'USER',
  BLOCK = 'BLOCK',
}

type PageType =
  | {
      type: PageTypeEnum.CHANNEL
      id: string
    }
  | {
      type: PageTypeEnum.GROUP
      id: string
    }
  | {
      type: PageTypeEnum.USER
      id: string
    }
  | {
      type: PageTypeEnum.BLOCK
    }

export interface PageContextType {
  page?: PageType
  setPage: (page: PageType) => void
}

export const PageContext = React.createContext<PageContextType>({
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

  useEffect(() => {
    console.log({ page })
  }, [page])

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
