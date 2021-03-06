import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    font-family: ${props => props.theme.fonts.sans};
    background-color: ${props => props.theme.colors.background};
  }

  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
  
  a:focus {
    outline: 0;
  }
`
