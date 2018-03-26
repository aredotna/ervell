import styled from 'styled-components';

const Link = styled.a.attrs({
  role: 'button',
})`
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
`;

export default Link;
