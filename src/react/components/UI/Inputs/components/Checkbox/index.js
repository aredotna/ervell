import styled from 'styled-components';

export default styled.input.attrs({
  type: 'checkbox',
})`
  all: initial;
  box-sizing: border-box;
  margin-right: 0.5em;
  appearance: checkbox;

  ${x => x.disabled && `
    pointer-events: none;
    opacity: 0.5;
  `}
`;
