import styled, { css } from 'styled-components'

import { textColor } from 'styled-system'
import { antialiased } from 'v2/styles/mixins'
import { preset } from 'v2/styles/functions'

export const baseMixin = css`
  ${antialiased}
  ${preset(textColor, { color: 'gray.block' })};
  font-size: 16px;
  line-height: 1.55;

  font-family: 'Arial';

  p {
    margin-top: 0;
  }
`

const smallMixin = css`
  font-size: 13px;

  line-height: 1.45;

  p,
  li,
  ol,
  code,
  pre {
    font-size: 0.9rem / em;
  }

  h1,
  h2,
  h3 {
    font-size: 1.1rem;
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
    font-size: 1.05rem/em;
  }

  ul,
  ol {
    margin-left: 0;
    padding-left: 0;

    li {
      list-style-position: inside;
    }

    ol, ul {
      padding-left: 2em;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    margin-bottom: 0.5em;
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
    background-color: rgb(250, 255, 195);
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
    padding: 0.25em;
    border: 1px solid rgba(232, 232, 232, 0.5);
    background-color: rgba(232, 232, 232, 0.3);
    border-radius: 3px;
  }

  code {
    // hack for weird md rendering
    br:first-child {
      display: none;
    }
  }

  blockquote {
    margin: 0;
    border-left: 4px solid rgba(232, 232, 232, 0.3);
    padding: 0px 0px 0px 1em;
    font-style italic;
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
