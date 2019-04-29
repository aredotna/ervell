import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import mod from 'v2/util/mod'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

const Container = styled(Box).attrs({
  border: '1px solid',
  borderColor: 'gray.light',
  bg: 'white',
})`
  position: absolute;
  z-index: 2;
`

const Suggestion = styled(Box).attrs({
  py: 4,
  pl: 5,
  pr: 9,
})`
  cursor: pointer;

  ${props =>
    props.isSelected &&
    `
    text-decoration: underline;
    background-color: ${props.theme.colors.gray.light};
  `}
`

class MentionTextareaSuggestions extends PureComponent {
  static propTypes = {
    suggestions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      })
    ),
    cursor: PropTypes.number,
    onSelected: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onUpdateCursor: PropTypes.func.isRequired,
  }

  static defaultProps = {
    suggestions: [],
    cursor: 0,
  }

  handleClick = e => {
    e.preventDefault()

    const { onClick } = this.props

    this.selectSuggestion()

    onClick()
  }

  selectSuggestion = () => {
    const { suggestions, onSelected, cursor } = this.props

    if (suggestions.length === 0) {
      return null
    }

    const selected = cursor && mod(cursor, suggestions.length + 1)
    const selectedSuggestion = suggestions[selected]

    if (selectedSuggestion) {
      onSelected(suggestions[selected].id)
    }

    return selectedSuggestion
  }

  handleMouseEnter = idx => () => {
    const { onUpdateCursor } = this.props

    return onUpdateCursor(idx)
  }

  render() {
    const {
      cursor,
      suggestions,
      onSelected,
      onClick: _onClick,
      onUpdateCursor: _onUpdateCursor,
      ...rest
    } = this.props

    const selectedSuggestion = this.selectSuggestion()

    return (
      <Container {...rest}>
        {suggestions.map((suggestion, idx) => (
          <Suggestion
            key={`Suggestion_${suggestion.id}`}
            isSelected={
              selectedSuggestion && selectedSuggestion.id === suggestion.id
            }
            onClick={this.handleClick}
            onMouseEnter={this.handleMouseEnter(idx)}
          >
            <Text f={1}>{suggestion.label}</Text>
          </Suggestion>
        ))}
      </Container>
    )
  }
}

export default MentionTextareaSuggestions
