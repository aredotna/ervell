import styled from 'styled-components';
import { antialiased } from 'react/styles/mixins';

export default styled.div`
  display: flex;
  padding: 1em 0.5em;
  border-top: 1px solid ${x => x.theme.colors.gray.semiLight};
  background-color: ${x => x.theme.colors.gray.hint};
  font-size: ${x => x.theme.fontSizesIndexed.md};
  color: ${x => x.theme.colors.gray.semiBold};
  line-height: ${x => x.theme.lineHeightsIndexed.compact};
  font-family: ${x => x.theme.fonts.sans};
  font-weight: bold;
  ${antialiased}
  
  &:last-child {
    border-bottom: 1px solid ${x => x.theme.colors.gray.semiLight};
  }
`;
