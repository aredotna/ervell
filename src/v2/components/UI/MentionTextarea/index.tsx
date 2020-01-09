import React, { useEffect } from 'react'
import { MentionsInput, Mention } from 'react-mentions'
import { useLazyQuery } from '@apollo/react-hooks'

import { MentionTextareaUserSuggestions } from '__generated__/MentionTextareaUserSuggestions'
import USER_SUGGESTION_QUERY from 'v2/components/UI/MentionTextarea/queries/userSuggestions'
import defaultStyle from 'v2/components/UI/MentionTextarea/defaultStyle'

interface MentionTextareaProps {
  value: string
  onChange: (newValue: string) => void
}

const MentionTextarea: React.FC<MentionTextareaProps> = ({
  value,
  onChange,
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

  return (
    <MentionsInput
      placeholder="Add new comment (mention by typing `@`)"
      value={value}
      onChange={(_e, newValue) => onChange(newValue)}
      style={defaultStyle}
      allowSuggestionsAboveCursor
    >
      <Mention
        displayTransform={name => `@${name}`}
        trigger="@"
        data={fetchSuggestions}
        appendSpaceOnAdd
      />
    </MentionsInput>
  )
}

export default MentionTextarea
