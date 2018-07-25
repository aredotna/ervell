import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { fontSize, space } from 'styled-system';

import { preset } from 'react/styles/functions';
import { antialiased } from 'react/styles/mixins';

const focusMixin = css`
  border: 1px solid ${x => x.theme.colors.gray.bold};
  background-color: ${x => x.theme.colors.gray.hint};
  color: ${x => x.theme.colors.gray.bold};
`;

export const mixin = css`
  all: initial;
  box-sizing: border-box;
  display: block;
  width: 100%;
  appearance: none;
  color: ${x => x.theme.colors.gray.semiBold};
  background-color: white;
  border: 1px solid ${x => x.theme.colors.gray.medium};
  font-family: ${x => x.theme.fonts.sans};
  ${preset(fontSize, { f: 5 })}
  ${preset(space, { px: 5, py: 4 })}
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

export const Label = styled.label`
  box-sizing: border-box;
  display: block;
  width: 100%;
  font-family: ${x => x.theme.fonts.sans};
  color: ${x => x.theme.colors.gray.base};
  ${preset(fontSize, { f: 2 })}
  ${antialiased}
  margin: 0.5em 0;

  a {
    text-decoration: underline;
    color: inherit;
  }
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

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  box-sizing: border-box;
  margin-right: 0.5em;
  appearance: checkbox;

  ${x => x.disabled && `
    pointer-events: none;
    opacity: 0.5;
  `}
`;

export default Input;
