import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import styles from 'react/styles';

export const inputVerticalPadding = '0.75em';
export const inputHorizontalPadding = '1em';
export const inputPadding = `${inputVerticalPadding} ${inputHorizontalPadding}`;
export const inputBorderRadius = '0.125em';

const focusMixin = css`
  background-color: ${styles.Colors.gray.light};
  color: ${styles.Colors.gray.bold};
`;


export const mixin = css`
  all: initial;
  box-sizing: border-box;
  display: block;
  width: 100%;
  appearance: none;
  padding: ${inputPadding};
  border-radius: ${inputBorderRadius};
  color: ${styles.Colors.gray.semiBold};
  background-color: ${styles.Colors.gray.hint};
  font-size: ${x => styles.Type.size[x.size || 'base']};
  font-family: ${styles.Type.font.sans};

  ${styles.Type.mixins.antialiased}

  ${x => x.focus && focusMixin}
  &:focus {
    ${focusMixin}
  }

  ${x => x.disabled && `
    pointer-events: none;
    opacity: 0.5;
  `}
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
    border-top: 0.5em solid ${styles.Colors.gray.semiBold};
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
