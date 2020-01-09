import colors from 'v2/styles/colors'

export default {
  control: {
    backgroundColor: 'rgb(247, 247, 247)',
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

      border: '2px inset',
    },
  },

  '&multiLine': {
    control: {
      fontFamily: 'Arial, sans-serif',
    },

    highlighter: {
      padding: 9,
    },

    input: {
      padding: 9,
      minHeight: 63,
      outline: 0,
      border: 0,
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'white',
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
