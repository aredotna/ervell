import styled from 'styled-components';


const RandomChannelIcon = styled.span.attrs({
  'aria-label': 'Random channel',
  role: 'img',
})`
  cursor: pointer;
  &:after {
    content: '🌀'
  }
`;

export default RandomChannelIcon;
