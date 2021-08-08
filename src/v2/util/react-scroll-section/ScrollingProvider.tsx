import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { debounce } from './utils'
import { Provider } from './context'
import smoothscroll from 'smoothscroll-polyfill'

type Props = {
  debounceDelay?: number
  scrollBehavior?: 'auto' | 'smooth'
  offset?: number
  children: ReactNode
}

const REFS: RefsRegister = {}
const META: Meta = {}

if (typeof window !== 'undefined') {
  smoothscroll.polyfill()
}

const ScrollingProvider = ({
  debounceDelay = 50,
  scrollBehavior = 'smooth',
  offset = 0,
  children,
}: Props) => {
  const [selected, setSelected] = useState('')

  const handleScroll = useCallback(() => {
    const selectedSection = Object.keys(REFS).reduce(
      (acc, id) => {
        if (!REFS[id].current)
          return {
            id: id,
            differenceFromTop: 0,
          }

        const { top } = REFS[id].current.getBoundingClientRect()
        const differenceFromTop = Math.abs(top)

        if (differenceFromTop >= acc.differenceFromTop) return acc

        return {
          differenceFromTop,
          id,
        }
      },
      {
        differenceFromTop: 9999,
        id: '',
      }
    )

    if (selected !== selectedSection.id) setSelected(selectedSection.id)
  }, [selected])

  const debounceScroll = debounce(handleScroll, debounceDelay)
  useEffect(() => {
    document.addEventListener('scroll', debounceScroll, {
      capture: true,
      passive: true,
      once: false,
    })
    handleScroll()
    return () => {
      document.removeEventListener('scroll', debounceScroll, { capture: true })
    }
  }, [debounceScroll, handleScroll])

  const registerRef = ({ id, meta }: { id: string; meta: unknown }) => {
    const ref = React.createRef<HTMLElement>()
    REFS[id] = ref
    META[id] = meta
    return ref
  }

  const scrollTo = useCallback(
    (section: string) => {
      const sectionRef = REFS[section]

      if (!sectionRef) return console.warn('Section ID not recognized!') // eslint-disable-line

      const top = sectionRef.current.offsetTop + offset
      window.scrollTo({
        top,
        behavior: scrollBehavior,
      })
    },
    [offset, scrollBehavior]
  )

  const value = useMemo(
    () => ({
      registerRef,
      scrollTo,
      refs: REFS,
      meta: META,
      selected,
    }),
    [scrollTo, selected]
  )

  return <Provider value={value}>{children}</Provider>
}

export default ScrollingProvider
