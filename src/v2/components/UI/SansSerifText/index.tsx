import styled, { css } from 'styled-components'

import { textColor } from 'styled-system'
import { antialiased } from 'v2/styles/mixins'
import { preset } from 'v2/styles/functions'

export const baseMixin = css`
  ${antialiased}
  ${preset(textColor, { color: 'gray.bold' })};
  font-size: 16px;
  line-height: 1.55;

  font-family: 'Arial';

  p:first-child {
    margin-top: 0;
  }
`

const smallMixin = css`
  font-size: 13px;

  line-height: 1.45;
  p,
  li,
  ol {
    font-size: 1rem;
  }

  h1 {
    font-size: 1.2rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.2rem;
  }

  h4 {
    font-size: 1rem;
  }

  h5 {
    font-size: 1rem;
  }

  h6 {
    font-size: 1rem;
  }
`

export const mixin = css`
  ${baseMixin}

  p, li, ol {
    font-size: 1.1rem;
  }

  ul,
  ol {
    margin-left: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  h1,
  h2,
  h3 {
    font-weight: normal;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.1rem;
  }

  h5 {
    font-size: 0.94rem;
  }

  h6 {
    font-size: 0.81rem;
  }

  mark {
    color: inherit;
  }

  hr {
    border: none;
    margin: 1em 0;
    height: 1px;
    background-color: #d8d8d8;
  }

  a {
    font-weight: bold;
    color: #333;
    text-decoration: none;
  }

  pre,
  code {
    font-size: 1rem;
    font-family: monospace;
    letter-spacing: -0.3px;
    line-height: 1.5em;
    background-color: rgba(232, 232, 232, 0.5);
    border: 1px solid rgba(232, 232, 232, 1);
    padding: 0.25em;
  }

  code {
    // hack for weird md rendering
    br:first-child {
      display: none;
    }
  }

  blockquote {
    border-left: 0.5em solid #eee;
    margin: 0 0 0 0.5em;
    padding: 0 0 0 0.75em;
  }

  pre {
    page-break-inside: avoid;
    word-wrap: break-word;
    max-width: 100%;
    overflow: scroll;
    white-space: pre-wrap;

    code {
      background: transparent;
      border: none;
    }
  }
`

export const SansSerifText = styled.div<{ isSmall: boolean }>`
  ${mixin}

  ${props =>
    props.isSmall &&
    `
    ${smallMixin}
  `}
`
