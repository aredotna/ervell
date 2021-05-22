import React, { useEffect, KeyboardEvent } from 'react'
import { MentionsInput, Mention } from 'react-mentions'
import { useLazyQuery } from '@apollo/client'

import { MentionTextareaUserSuggestions } from '__generated__/MentionTextareaUserSuggestions'
import USER_SUGGESTION_QUERY from 'v2/components/UI/MentionTextarea/queries/userSuggestions'
import defaultStyle from 'v2/components/UI/MentionTextarea/defaultStyle'
import useCurrentTheme from 'v2/hooks/useCurrentTheme'

interface MentionTextareaProps {
  value: string
  onChange: (newValue: string) => void
  onKeyDown?: (event: KeyboardEvent) => void
}

export const SPECIAL_CHARACTER = '!%!'

const MentionTextarea: React.FC<MentionTextareaProps> = ({
  value,
  onChange,
  onKeyDown,
}) => {
  const [getSuggestions, { refetch }] = useLazyQuery<
    MentionTextareaUserSuggestions
  >(USER_SUGGESTION_QUERY)

  const fetchSuggestions = (query: string, callback: () => void) => {
    return refetch({ query })
      .then(results => {
        if (!results?.data?.suggestions) return []
        return results.data.suggestions.users.map(user => ({
          display: user.label,
          id: user.id,
        }))
      })
      .then(callback)
  }

  // getSuggestions doesn't return a promise,
  // so we have to use refetch,
  // which needs to be called once.
  useEffect(() => {
    getSuggestions()
  }, [getSuggestions])

  const theme = useCurrentTheme()

  return (
    <MentionsInput
      placeholder="Add new comment (mention by typing `@`)"
      value={value}
      onChange={(_e, newValue) => onChange(newValue)}
      style={defaultStyle({ theme })}
      markup="@__id__"
      allowSuggestionsAboveCursor
      onKeyDown={onKeyDown}
    >
      <Mention
        displayTransform={name => `@${name}`}
        trigger="@"
        // This is a weird thing we have to do to get
        // around a limitation in react-mention
        markup={`${SPECIAL_CHARACTER}@__id__${SPECIAL_CHARACTER}`}
        data={fetchSuggestions}
        appendSpaceOnAdd
      />
    </MentionsInput>
  )
}

export default MentionTextarea
