import { debounce } from 'lodash'
import { useState, useEffect } from 'react'

function getWindowDimensions(hasWindow) {
  const width = hasWindow ? window.innerWidth : null
  const height = hasWindow ? window.innerHeight : null
  return {
    width,
    height,
  }
}

export default function useWindowDimensions() {
  const hasWindow = typeof window !== 'undefined'

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(hasWindow)
  )

  useEffect(() => {
    if (hasWindow) {
      const handleResize = debounce(() => {
        setWindowDimensions(getWindowDimensions(hasWindow))
      }, 100)

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [hasWindow])

  return windowDimensions
}
