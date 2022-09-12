export type IconState = 'X' | 'MagnifyingGlass'
export type TopBarMode = 'resting' | 'active' | 'blurred'

export interface TopBarState {
  mode: TopBarMode
  icon?: IconState
  iconBgColor?: string
  primaryButtonBg?: string
  secondaryButtonBg?: string
  inputBg?: string
  containerBg?: string
  hasQuery?: boolean
}

export type TopBarAction =
  | { type: 'MOUSEENTER_PRIMARY'; payload: any }
  | { type: 'MOUSEENTER_SECONDARY'; payload: any }
  | { type: 'MOUSEENTER_CONTAINER'; payload: any }
  | { type: 'MOUSEENTER_ICON'; payload: any }
  | { type: 'MOUSELEAVE'; payload: any }
  | { type: 'FOCUS'; payload: any }
  | { type: 'BLUR'; payload: any }
  | { type: 'CLEAR'; payload: any }
  | { type: 'CLOSE'; payload: any }
  | { type: 'CHANGE_QUERY'; payload: boolean }

export const initialTopBarState: TopBarState = {
  mode: 'resting',
  icon: null,
  primaryButtonBg: null,
  secondaryButtonBg: null,
  inputBg: null,
  containerBg: null,
  hasQuery: false,
}

const getIconState = (state: TopBarState): IconState => {
  if (state.hasQuery) {
    return 'X'
  }
  return 'MagnifyingGlass'
}

const ReducerMethodMap = {
  MOUSEENTER_PRIMARY: state => {
    return {
      ...state,
      primaryButtonBg: 'gray.light',
      icon: 'MagnifyingGlass',
      iconBgColor: 'gray.light',
      secondaryButtonBg: null,
    }
  },

  MOUSEENTER_SECONDARY: state => {
    return {
      ...state,
      secondaryButtonBg: 'gray.light',
      icon: 'MagnifyingGlass',
      primaryButtonBg: null,
    }
  },

  MOUSEENTER_ICON: state => {
    return {
      ...state,
      primaryButtonBg: null,
      icon: state.hasQuery ? 'X' : null,
      iconBgColor: 'gray.light',
      containerBg: state.hasQuery ? 'gray.light' : null,
      secondaryButtonBg: null,
    }
  },

  MOUSEENTER_CONTAINER: state => {
    return {
      ...state,
      primaryButtonBg: 'gray.light',
      icon: getIconState(state),
      iconBgColor: 'gray.light',
      containerBg:
        state.hasQuery || state.mode == 'active' ? 'gray.light' : null,
      secondaryButtonBg: null,
    }
  },

  MOUSELEAVE: state => {
    console.log({ state })
    if (state.mode === 'active') {
      return { ...state }
    }

    if (state.mode === 'blurred') {
      return {
        ...state,
        containerBg: null,
        iconBgColor: null,
        primaryButtonBg: null,
        secondaryButtonBg: null,
      }
    }

    return { ...initialTopBarState }
  },

  FOCUS: state => {
    return {
      ...state,
      icon: getIconState(state),
      containerBg: 'gray.light',
      primaryButtonBg: null,
      secondaryButtonBg: null,
      mode: 'active',
    }
  },

  BLUR: state => {
    return state
  },

  CLOSE: state => {
    if (state.mode === 'active') {
      return {
        ...state,
        mode: 'blurred',
        containerBg: null,
        icon: state.hasQuery ? 'X' : null,
        iconBgColor: null,
        primaryButtonBg: null,
        secondaryButtonBg: null,
      }
    }
    return { ...initialTopBarState }
  },

  CLEAR: () => {
    return { ...initialTopBarState }
  },

  CHANGE_QUERY: (state, { payload }) => {
    return {
      ...state,
      hasQuery: payload,
      icon: state.hasQuery ? 'X' : null,
    }
  },
}

export const advancedPrimarySearchReducer = (
  state: TopBarState,
  action: TopBarAction
) => {
  switch (action.type) {
    case 'MOUSEENTER_PRIMARY':
    case 'MOUSEENTER_SECONDARY':
    case 'MOUSEENTER_CONTAINER':
    case 'MOUSEENTER_ICON':
    case 'MOUSELEAVE':
    case 'FOCUS':
    case 'CLOSE':
    case 'BLUR':
    case 'CLEAR':
    case 'CHANGE_QUERY':
      return ReducerMethodMap[action.type](state, action)
    default:
      return state
  }
}
