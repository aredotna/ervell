import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ${props => props.theme.fonts.sans};
    background-color: ${props => props.theme.colors.background};

    // Fix for a phantom horizontal scroll
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
  
  a:focus {
    outline: none;
  }

  a:focus-visible {
    outline: 1px solid ${({ theme }) => theme.colors.state.premium};
  }

  @media not all and (min-resolution:.001dpcm){ 
    @supports (-webkit-appearance:none) {
      a:focus { 
        outline: 0;
      }
    }
  }
`
