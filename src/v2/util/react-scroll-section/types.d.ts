type RefsRegister = {
  [x: string]: RefObject<HTMLElement>
}

type Meta = {
  [id: string]: unknown
}

type ScrollContextType = {
  registerRef: ({ id: string, meta: unknown }) => RefObject<HTMLElement> | null
  scrollTo: (section: string) => void
  refs: RefsRegister
  meta: Meta
  selected: string
}
