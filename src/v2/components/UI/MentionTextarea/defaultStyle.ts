import lightColors from 'v2/styles/colors'
import darkColors from 'v2/styles/darkColors'

export default ({ theme }) => {
  const colors = theme === 'default' ? lightColors : darkColors

  return {
    control: {
      backgroundColor: colors.gray.input,
      fontFamily: 'Arial, sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.33,
      fontWeight: 'normal',
    },

    highlighter: {
      overflow: 'hidden',
    },

    input: {
      margin: 0,
    },

    '&singleLine': {
      control: {
        display: 'inline-block',

        width: 130,
      },

      highlighter: {
        padding: 1,
        border: '2px inset transparent',
      },

      input: {
        padding: 1,
        color: colors.gray.bold,
        border: '2px inset',
      },
    },

    '&multiLine': {
      control: {
        fontFamily: 'Arial, sans-serif',
      },

      highlighter: {
        padding: '0.75em',
      },

      input: {
        padding: '0.75em',
        minHeight: 100,
        outline: 0,
        border: 0,
        color: colors.gray.bold,
      },
    },

    suggestions: {
      list: {
        backgroundColor: colors.gray.hint,
        border: `1px solid ${colors.gray.hint}`,
        fontSize: '0.875rem',
        color: colors.gray.base,
      },

      item: {
        padding: '0.65625em 0.75em',
        borderBottom: `1px solid ${colors.gray.hint}`,

        '&focused': {
          backgroundColor: colors.gray.semiLight,
        },
      },
    },
  }
}
