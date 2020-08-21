import React, { PureComponent } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import HomeLink from 'v2/components/TopBar/components/PrimarySearch/components/HomeLink'
import Overlay from 'v2/components/UI/Overlay'
import SearchInput from 'v2/components/UI/SearchInput'
import PrimarySearchResults from 'v2/components/TopBar/components/PrimarySearch/components/PrimarySearchResults'

import { overflowScrolling } from 'v2/styles/mixins'
import { useIsOutsideMainRouter } from 'v2/hooks/useIsOutsideMainRouter'

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
  history: any
  // TODO: Delete isOutsideMainRouter
  // This is a temporary measure to handle cases where components can exist both
  // inside and outside the main router.
  isOutsideMainRouter: boolean
  flex?: number
}

class PrimarySearch extends PureComponent<PrimarySearchProps> {
  state = {
    mode: 'resting',
    debouncedQuery: '',
    query: '',
    cursor: null,
    href: null,
  }

  searchInputRef = React.createRef()

  handleSelection = href => this.setState({ href })

  handleQuery = query => {
    this.setState({ query, cursor: null })
  }

  handleDebouncedQuery = debouncedQuery => {
    this.setState({ debouncedQuery, cursor: null })
  }

  handleClick = () => {
    this.setState({ query: '', debouncedQuery: '' })
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
    const { history, isOutsideMainRouter } = this.props

    switch (key) {
      case 'Escape':
        this.setState({ query: '' })
        break
      case 'Enter':
        if (query === '') return
        this.setState({ query: '', debouncedQuery: '' })

        if (isOutsideMainRouter) {
          window.location.href = href
          break
        }

        history.push(href)
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
          tabIndex={1}
          flex="1"
          py={6}
          placeholder="Search Are.na"
          bg={scheme === 'GROUP' && 'transparent'}
          border={0}
          query={query}
          onQueryChange={this.handleQuery}
          onDebouncedQueryChange={this.handleDebouncedQuery}
          ref={this.searchInputRef}
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

        {query && (
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
  const history = useHistory()
  const isOutsideMainRouter = useIsOutsideMainRouter()
  return (
    <PrimarySearch
      history={history}
      isOutsideMainRouter={isOutsideMainRouter}
      {...props}
    />
  )
}

export default PrimarySearchContainer
