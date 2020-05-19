export default ({ themeGet }) => {
  return {
    control: {
      backgroundColor: themeGet('colors.background'),
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
      color: themeGet('colors.gray.base'),
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
        color: themeGet('colors.gray.base'),
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
        color: themeGet('colors.gray.base'),
      },
    },

    suggestions: {
      list: {
        backgroundColor: 'white',
        border: `1px solid ${themeGet('colors.gray.hint')}`,
        fontSize: '0.875rem',
        color: themeGet('colors.gray.base'),
      },

      item: {
        padding: '0.65625em 0.75em',
        borderBottom: `1px solid ${themeGet('colors.gray.hint')}`,

        '&focused': {
          backgroundColor: themeGet('colors.gray.semiLight'),
        },
      },
    },
  }
}
