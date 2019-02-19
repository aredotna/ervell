import styled from 'styled-components';
import { themeGet, space, alignSelf } from 'styled-system';

const Close = styled.a`
  position: relative;
  box-sizing: border-box;
  display: block;
  width: ${props => props.theme.space[props.size]};
  height: ${props => props.theme.space[props.size]};
  padding: ${props => props.theme.space[props.size]};
  cursor: pointer;
  ${alignSelf}
  ${space}

  &:before,
  &:after {
    position: absolute;
    display: block;
    content: '';
    width: 50%;
    height: ${props => props.thickness};
    top: 50%;
    left: 50%;
    background-color: ${props => themeGet(`colors.${props.color}`, props.theme.colors.gray.semiBold)(props)};
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(135deg);
  }

  &:hover:before,
  &:hover:after {
    background-color: black;
  }
`;

Close.defaultProps = {
  thickness: '1px',
  size: 6,
};

export default Close;
