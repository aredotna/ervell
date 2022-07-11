import React, { PureComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import HomeLink from 'v2/components/TopBar/components/PrimarySearch/components/HomeLink'
import Overlay from 'v2/components/UI/Overlay'
import SearchInput from 'v2/components/UI/SearchInput'
import PrimarySearchResults from 'v2/components/TopBar/components/PrimarySearch/components/PrimarySearchResults'

import { overflowScrolling } from 'v2/styles/mixins'
import { useIsOutsideMainRouter } from 'v2/hooks/useIsOutsideMainRouter'
import { isEmpty } from 'lodash'

const Container = styled(Box)`
  position: relative;
  display: flex;
  align-items: stretch;
`

const Results = styled(Box)`
  height: 100%;
  ${overflowScrolling}
`

interface PrimarySearchProps {
  scheme: 'DEFAULT' | 'GROUP'
  navigate: any
  // TODO: Delete isOutsideMainRouter
  // This is a temporary measure to handle cases where components can exist both
  // inside and outside the main router.
  isOutsideMainRouter: boolean
  flex?: number
  query?: string
}

class PrimarySearch extends PureComponent<PrimarySearchProps> {
  state = {
    mode: 'resting',
    debouncedQuery: '',
    query: '',
    cursor: null,
    href: null,
  }

  constructor(props: PrimarySearchProps) {
    super(props)

    this.state = {
      mode: props.query && props.query !== '' ? 'blur' : 'resting',
      debouncedQuery: props.query || '',
      query: props.query || '',
      cursor: null,
      href: null,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (isEmpty(nextProps.query) && !isEmpty(this.state.query)) {
      this.resetState()
    }

    if (nextProps.query !== this.state.query) {
      this.setState({ query: nextProps.query, debouncedQuery: nextProps.query })
    }
  }

  resetState = () => {
    this.setState({ query: '', mode: 'focus' })
  }

  inputRef = React.createRef()
  searchInputRef = React.createRef()

  handleSelection = href => this.setState({ href })

  handleQuery = query => {
    this.setState({ query, cursor: null })
  }

  handleDebouncedQuery = debouncedQuery => {
    this.setState({ debouncedQuery, cursor: null })
  }

  handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!e.metaKey) {
      this.setState({ query: '', debouncedQuery: '' })
    }
  }

  handleBlur = () => {
    if (this.state.query) {
      this.setState({ mode: 'blur' })
      return
    }

    this.setState({ mode: 'resting' })
  }

  handleFocus = () => this.setState({ mode: 'focus' })

  handleKeyDown = ({ key }) => {
    const { cursor, href, query } = this.state
    const { navigate, isOutsideMainRouter } = this.props

    switch (key) {
      case 'Escape':
        this.setState({ query: '' })
        break
      case 'Enter':
        if (query === '') return
        this.setState({ mode: 'blur' })

        if (isOutsideMainRouter) {
          window.location.href = href
          break
        }

        navigate(href)
        break
      case 'ArrowDown':
        this.setState({
          cursor: (cursor === null ? -1 : cursor) + 1,
        })
        break
      case 'ArrowUp':
        this.setState({
          cursor: (cursor === null ? 0 : cursor) - 1,
        })
        break
      default:
        break
    }
  }

  handleMouseEnter = () => {
    if (this.state.mode !== 'resting') return
    this.setState({ mode: 'hover' })
  }

  handleMouseLeave = () => {
    if (this.state.mode !== 'hover') return
    this.setState({ mode: 'resting' })
  }

  render() {
    const { scheme, ...rest } = this.props
    const { mode, query, debouncedQuery, cursor } = this.state

    return (
      <Container {...rest}>
        {mode === 'resting' && <HomeLink />}

        <SearchInput
          globallyFocusOnKey="/"
          tabIndex={0}
          flex="1"
          py={6}
          placeholder="Search Are.na"
          bg={scheme === 'GROUP' && 'transparent'}
          border={0}
          query={query}
          onQueryChange={this.handleQuery}
          onDebouncedQueryChange={this.handleDebouncedQuery}
          ref={this.inputRef}
          searchInputRef={this.searchInputRef}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          outlineless
          iconMap={{
            resting: null,
            focus: 'MagnifyingGlass',
            hover: 'MagnifyingGlass',
            active: 'X',
          }}
        />

        {query && debouncedQuery && mode != 'blur' && (
          <Overlay targetEl={() => this.searchInputRef.current} fullWidth>
            <Results>
              <PrimarySearchResults
                query={query}
                debouncedQuery={debouncedQuery}
                cursor={cursor}
                onSelection={this.handleSelection}
                onClick={this.handleClick}
              />
            </Results>
          </Overlay>
        )}
      </Container>
    )
  }
}

const PrimarySearchContainer: React.FC<{
  scheme: 'DEFAULT' | 'GROUP'
  flex?: number
}> = ({ ...props }) => {
  const naviate = useNavigate()
  const isOutsideMainRouter = useIsOutsideMainRouter()

  const params: any = useParams()

  return (
    <PrimarySearch
      navigate={naviate}
      isOutsideMainRouter={isOutsideMainRouter}
      query={params?.term}
      {...props}
    />
  )
}

export default PrimarySearchContainer
