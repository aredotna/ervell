import React from 'react'

export enum PageTypeEnum {
  CHANNEL = 'CHANNEL',
  GROUP = 'GROUP',
  PERSON = 'PERSON',
  BLOCK = 'BLOCK',
}

export type PageType =
  | {
      type: PageTypeEnum.CHANNEL
      name?: string
      id: string
    }
  | {
      type: PageTypeEnum.GROUP
      name?: string
      id: string
    }
  | {
      type: PageTypeEnum.PERSON
      name?: string
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
