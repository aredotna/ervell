import styled from 'styled-components'
import { baseMixin as baseTextMixin } from 'v2/components/UI/Text'
import { inputPadding } from 'v2/components/UI/Inputs'

export const ItemContainer = styled.div.attrs({
  role: 'button',
  tabIndex: 0,
  f: 1,
})`
  ${baseTextMixin}
  position: relative;
  margin-top: -1px;
  line-height: 1;
  user-select: none;
  cursor: pointer;
  color: ${props => props.theme.colors.gray.semiBold};
  border: 1px solid ${props => props.theme.colors.gray.regular};
  background-color: ${props => props.theme.colors.gray.hint};
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
  outline: none;
  padding: ${inputPadding};

  &:hover {
    z-index: 1;
    border: 1px solid ${props => props.theme.colors.gray.semiBold};
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1em;
    background: linear-gradient(to left, ${props =>
      props.theme.colors.gray.hint}, ${props =>
  props.theme.colors.utility.transparent});
    z-index: 1;
  }

  &:hover,
  &[data-selected="true"] {
    &:before {
      width: 3em;
      background linear-gradient(to left, ${props =>
        props.theme.colors.gray.hint} 60%, ${props =>
  props.theme.colors.utility.transparent})
    }

    &:after {
      content: '✔';
      position: absolute;
      top: 50%;
      right: 0;
      width: 2em;
      text-align: center;
      transform: translateY(-50%);
      z-index: 1;
    }
  }

  &[data-selected="true"] {
    > div {
      opacity: 0.5;
    }
  }

  &[data-highlighted="true"] {
    &:before {
      width: 3em;
      background: transparent;
    }

    > div {
      background: ${props => props.theme.colors.state.highlight};
    }

    &:after {
      background: transparent;
    }
  }
`
