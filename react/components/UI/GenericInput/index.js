import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { fontSize } from 'styled-system';

import { preset } from 'react/styles/functions';
import { antialiased } from 'react/styles/mixins';

export const inputVerticalPadding = '0.75em';
export const inputHorizontalPadding = '1em';
export const inputPadding = `${inputVerticalPadding} ${inputHorizontalPadding}`;
export const inputBorderRadius = '0.125em';

const focusMixin = css`
  border: 2px solid ${x => x.theme.colors.gray.bold};
  background-color: ${x => x.theme.colors.gray.hint};
  color: ${x => x.theme.colors.gray.bold};
`;

export const mixin = css`
  all: initial;
  box-sizing: border-box;
  display: block;
  width: 100%;
  appearance: none;
  padding: ${inputPadding};
  border-radius: ${inputBorderRadius};
  color: ${x => x.theme.colors.gray.semiBold};
  background-color: white;
  border: 2px solid ${x => x.theme.colors.gray.medium};
  font-family: ${x => x.theme.fonts.sans};
  ${preset(fontSize, { f: 5 })}
  ${antialiased}

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
    border-top: 0.5em solid ${x => x.theme.colors.gray.semiBold};
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
