import Mousetrap from 'mousetrap'

import { toggle as toggleDarkTheme } from 'v2/components/UI/Layouts/BlankLayout/components/LegacyDarkTheme'

export const bind = () => {
  Mousetrap.bind('shift+ctrl+i', toggleDarkTheme)

  /**
   * Additional global keybinding (`/`) is available for focusing search, and
   * is bound within componentDidMount since there's currently no easy way to
   * distantly communicate with mounted component instances.
   *
   * TODO: Can this shortcuts file be deleted since dark mode toggle is now
   * within settings?
   *
   * @see src/v2/components/UI/SearchInput/index.tsx
   */
}

export const unbind = () => {
  Mousetrap.unbind(['shift+ctrl+i'])
}

export default {
  bind,
  unbind,
}
