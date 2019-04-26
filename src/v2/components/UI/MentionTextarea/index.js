import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import InputTrigger from 'react-input-trigger'
import { Query } from 'react-apollo'

import userSuggestionsQuery from 'v2/components/UI/MentionTextarea/queries/userSuggestions'

import Box from 'v2/components/UI/Box'
import { Textarea } from 'v2/components/UI/Inputs'
import MentionTextareaSuggestions from 'v2/components/UI/MentionTextarea/components/MentionTextareaSuggestions'

export default class MentionTextarea extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
  }

  static defaultProps = {
    onChange: () => {},
    onKeyDown: () => {},
  }

  state = {
    mode: 'resting',
    position: {},
    cursor: 0,
    selectionStart: null,
    query: '',
    value: '',
  }

  textareaRef = React.createRef()

  toggleSuggestions = ({
    hookType,
    cursor: { top, left, height, selectionStart },
  }) => {
    if (hookType === 'start') {
      this.setState({
        mode: 'suggesting',
        position: { top: top + height, left },
        selectionStart,
      })
    }

    if (hookType === 'cancel') {
      this.resetMention()
    }
  }

  resetMention = () => {
    this.setState({
      mode: 'resting',
      position: {},
      query: '',
      selectionStart: null,
    })
  }

  cancelMention = () => {
    this.resetMention()
    this.endHandler()
  }

  handleInput = ({ text: query }) => {
    this.setState({ query: query.trim() })
  }

  handleSuggestionNav = e => {
    const { key } = e
    const { cursor, mode } = this.state

    if (mode === 'resting') return

    switch (key) {
      case 'Escape':
        this.cancelMention()
        break
      case 'Tab':
      case 'Enter': {
        e.preventDefault()

        this.executeSelection()
        break
      }
      case 'ArrowDown':
        e.preventDefault()

        this.setState({
          cursor: cursor + 1,
        })
        break
      case 'ArrowUp':
        e.preventDefault()

        this.setState({
          cursor: cursor - 1,
        })
        break
      default:
        break
    }
  }

  handleSelection = selectedId => {
    this.setState({ selectedId })
  }

  executeSelection = () => {
    const { onChange } = this.props
    const { selectionStart, selectedId, value } = this.state

    const head = value.slice(0, selectionStart)
    const tail = value.slice(selectionStart + selectedId.length, value.length)
    const newValue = `${head}${selectedId}${tail}`

    this.setState({
      mode: 'resting',
      position: {},
      query: '',
      selectionStart: null,
      value: newValue,
    })

    this.endHandler()

    // TODO: Ensure focus
    // this.textareaRef.current.focus();

    // Ensures parent component receives the change
    onChange({ target: { value: newValue } })
  }

  handleChange = e => {
    const { onChange } = this.props

    const {
      target: { value },
    } = e

    this.setState({ value })

    return onChange(e)
  }

  handleKeydown = e => {
    const { mode } = this.state
    const { onKeyDown } = this.props

    if (mode === 'suggesting') {
      return null
    }

    return onKeyDown(e)
  }

  updateCursor = cursor => {
    this.setState({ cursor })
  }

  render() {
    const { mode, position, query, cursor, value } = this.state

    const { onChange: _onChange, onKeyDown: _onKeyDown, ...rest } = this.props

    return (
      <Box position="relative" onKeyDown={this.handleSuggestionNav}>
        <InputTrigger
          trigger={{
            keyCode: 50,
            shiftKey: true,
          }}
          onType={this.handleInput}
          onStart={this.toggleSuggestions}
          onCancel={this.toggleSuggestions}
          endTrigger={endHandler => {
            this.endHandler = endHandler
          }}
        >
          <Textarea
            ref={this.textareaRef}
            placeholder="Type something..."
            onChange={this.handleChange}
            onKeyDown={this.handleKeydown}
            value={value}
            {...rest}
          />
        </InputTrigger>

        {mode === 'suggesting' && query !== '' && (
          <Query query={userSuggestionsQuery} variables={{ query }}>
            {({ loading, error, data }) => {
              if (loading || error) {
                this.updateCursor(0)
                return null
              }

              const {
                suggestions: { users: suggestions },
              } = data

              return (
                <MentionTextareaSuggestions
                  suggestions={suggestions}
                  query={query}
                  cursor={cursor}
                  onSelected={this.handleSelection}
                  onClick={this.executeSelection}
                  onUpdateCursor={this.updateCursor}
                  {...position}
                />
              )
            }}
          </Query>
        )}
      </Box>
    )
  }
}
