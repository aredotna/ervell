import styled from 'styled-components';

export default styled.div`
  display: flex;
  padding: 0.5em;
  border: 1px solid ${x => x.theme.colors.gray.regular};
  border-top: 0;
  background-color: ${x => x.theme.colors.gray.hint};
  font-size: ${x => x.theme.fontSizesIndexed.md};
`;
