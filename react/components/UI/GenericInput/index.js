import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Styles from 'react/styles';

export const inputVerticalPadding = '0.75em';
export const inputHorizontalPadding = '1em';
export const inputPadding = `${inputHorizontalPadding} ${inputVerticalPadding}`;
export const inputBorderRadius = '0.125em';

export const mixin = css`
  all: initial;
  box-sizing: border-box;
  display: block;
  width: 100%;
  appearance: none;
  padding: ${inputPadding};
  border-radius: ${inputBorderRadius};
  color: ${Styles.Colors.gray.semiBold};
  background-color: ${Styles.Colors.gray.hint};
  font-size: ${x => Styles.Type.size[x.size || 'base']};
  font-family: ${Styles.Type.font.sans};
  ${Styles.Type.mixins.antialiased}
`;

export const Input = styled.input`
  ${mixin}
`;

export const Textarea = styled.textarea`
  ${mixin}
`;

const SelectWrapper = styled.div`
  position: relative;

  &:after {
    display: inline-block;
    content '';
    width: 0;
    height: 0;
    position: absolute;
    top: 50%;
    right: 1em;
    transform: translate(0.25em, -50%);
    border-top: 0.5em solid ${Styles.Colors.gray.semiBold};
    border-right: 0.25em solid transparent;
    border-left: 0.25em solid transparent;
    pointer-events: none;
  }
`;

const SelectTag = styled.select`
  ${mixin}
  padding-right: 1.5em;
`;

export const Select = ({ children, ...rest }) => (
  <SelectWrapper>
    <SelectTag {...rest}>
      {children}
    </SelectTag>
  </SelectWrapper>
);

Select.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Input;
