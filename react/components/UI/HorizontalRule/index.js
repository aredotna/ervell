import styled from 'styled-components';

export default styled.hr`
  margin: 1em auto;
  height: 1px;
  border: none;
  background-color: ${x => `
    ${!x.invisible && (x.color || x.theme.colors.gray.regular)}
  `};
`;
