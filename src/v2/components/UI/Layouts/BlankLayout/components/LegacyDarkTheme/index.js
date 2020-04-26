// TODO: This should be replaced with a styled-components theme

import { createGlobalStyle } from 'styled-components'
import Cookies from 'cookies-js'

export const toggle = mode => {
  const { theme } = document.documentElement.dataset
  const nextTheme = { dark: 'default', default: 'dark' }[theme]
  document.documentElement.dataset.theme = mode || nextTheme
  const cookieFlag = { dark: '1', default: '0' }[nextTheme]
  Cookies.set('is-inverted', cookieFlag)
}

export default createGlobalStyle`
  html[data-theme='dark'] {
    &,
    img,
    canvas,
    [style*='background-image'] {
      filter: invert(100%) hue-rotate(180deg);

      iframe {
        filter: invert(100%) hue-rotate(180deg);
      }
    }

    // Chrome
    @media all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
      body {
        background-color: white;
      }
    }

    // Safari 8+
    _::-webkit-full-page-media,
    _:future,
    :root {
      body {
        background-color: white;
      }
    }
  }
`
