import React, { FocusEvent, PureComponent } from 'react'
import styled from 'styled-components'
import { isEmpty, debounce, pick, omit } from 'underscore'
import Mousetrap from 'mousetrap'

import compactObject from 'v2/util/compactObject'

import Box, { BoxProps } from 'v2/components/UI/Box'
import Icons from 'v2/components/UI/Icons'
import { Input } from 'v2/components/UI/Inputs'

const OUTER_PROPS_KEYS = ['m', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'flex']

export const ICON_OFFSET = '3.125em'

const Container = styled(Box)`
  position: relative;
`

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${ICON_OFFSET};
  cursor: pointer;
`

interface IconMap {
  active: string
  focus: string
  hover: string
  resting: string
}

interface Props extends BoxProps {
  debounceWait?: number
  forwardedRef?: any
  globallyFocusOnKey?: string
  iconMap?: IconMap
  onBlur?: (e: FocusEvent<Element>) => any
  onDebouncedQueryChange?: (props: any) => any
  onFocus?: () => any
  onQueryChange?: (props: any) => any
  placeholder?: string
  query?: string
  outlineless?: boolean
  searchInputRef?: any
}

interface State {
  mode: string
  query: string
}

class SearchInput extends PureComponent<Props, State> {
  static defaultProps = {
    query: '',
    onFocus: () => {},
    onBlur: () => {},
    onQueryChange: () => {},
    onDebouncedQueryChange: () => {},
    debounceWait: 250,
    forwardedRef: null,
    iconMap: {
      resting: 'MagnifyingGlass',
      hover: 'MagnifyingGlass',
      focus: 'MagnifyingGlass',
      active: 'X',
    },
  }

  handleDebouncedQueryChange: (props: any) => any
  inputRef: any

  constructor(props: Props) {
    super(props)

    const { debounceWait, onDebouncedQueryChange } = props

    this.handleDebouncedQueryChange = debounce(
      onDebouncedQueryChange,
      debounceWait
    )

    this.state = {
      mode: props.query && props.query !== '' ? 'active' : 'resting',
      query: props.query,
    }

    this.inputRef = props.searchInputRef || React.createRef()
  }

  componentDidMount() {
    this.maybeAttachGlobalFocusKeyListener()
  }

  componentWillUnmount() {
    if (this.props.globallyFocusOnKey) {
      Mousetrap.unbind([this.props.globallyFocusOnKey])
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (isEmpty(nextProps.query) && !isEmpty(this.state.query)) {
      this.resetState()
    }
    if (nextProps.query !== this.state.query) {
      this.setState({ query: nextProps.query })
    }
  }

  resetState = () => {
    this.setState({ query: '', mode: 'focus' })
    this.inputRef.current.value = ''
    this.inputRef.current.focus()
  }

  maybeAttachGlobalFocusKeyListener = () => {
    const { globallyFocusOnKey } = this.props

    if (globallyFocusOnKey) {
      Mousetrap.bind(globallyFocusOnKey, event => {
        event.preventDefault()
        this.handleFocus()
        this.inputRef.current.focus()
        this.inputRef.current.value = ''
      })
    }
  }

  handleMouseEnter = () => {
    if (this.state.mode === 'focus') return
    if (this.state.mode === 'active') return
    this.setState({ mode: 'hover' })
  }

  handleMouseLeave = () => {
    if (this.state.mode === 'focus') return
    if (this.state.mode === 'active') return
    this.setState({ mode: 'resting' })
  }

  handleFocus = () => {
    this.props.onFocus()
    if (this.state.mode === 'active') return
    this.setState({ mode: 'focus' })
  }

  handleBlur = (e: FocusEvent) => {
    this.props.onBlur(e)
    if (this.state.mode === 'active') return
    this.setState({ mode: 'resting' })
  }

  handleChange = ({ target: { value: query } }) => {
    const currentState = { query, mode: 'active' }

    if (isEmpty(query)) {
      currentState.mode = 'focus'
    }

    this.setState(currentState)
    this.props.onQueryChange(query)
    this.handleDebouncedQueryChange(query)
  }

  handleReset = () => {
    this.resetState()
    this.props.onQueryChange('')
    this.props.onDebouncedQueryChange('')
  }

  render() {
    const {
      query: _query,
      onFocus,
      onBlur,
      onQueryChange: _onQueryChange,
      onDebouncedQueryChange: _onDebouncedQueryChange,
      debounceWait: _debounceWait,
      forwardedRef,
      iconMap,
      searchInputRef,
      ...rest
    } = this.props

    const { mode, query } = this.state

    const outerProps = compactObject(pick(rest, ...OUTER_PROPS_KEYS))
    const innerProps = omit(rest, ...OUTER_PROPS_KEYS)

    return (
      <Container
        ref={forwardedRef}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...outerProps}
      >
        {iconMap[mode] && (
          <Icon onClick={this.handleReset}>
            <Icons
              width="1.5em"
              height="0.88em"
              color="gray.medium"
              name={iconMap[mode]}
            />
          </Icon>
        )}

        <Input
          width="100%"
          px={ICON_OFFSET}
          borderColor="gray.regular"
          {...innerProps}
          ref={searchInputRef}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          defaultValue={query}
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          value={query}
        />
      </Container>
    )
  }
}

export default React.forwardRef((props: Props, ref) => (
  // @ts-ignore
  <SearchInput forwardedRef={ref} {...props} />
))
