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

`
