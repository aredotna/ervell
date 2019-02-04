import styled from 'styled-components';


const MagicHat = styled.span.attrs({
  'aria-label': 'Random channel',
  role: 'img',
})`
  cursor: pointer;
  
  &:after {
    content: '🎩'
  }

  ${x => x.pressed && `
    &:after {
      content: '🌀'
    }
  `}
`;

export default MagicHat;
