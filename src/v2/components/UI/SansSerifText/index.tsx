import styled, { css } from 'styled-components'

import { textColor } from 'styled-system'
import { antialiased } from 'v2/styles/mixins'
import { preset } from 'v2/styles/functions'

export const baseMixin = css`
  ${antialiased}
  ${preset(textColor, { color: 'gray.block' })};
  font-size: 16px;
  line-height: 1.55;

  font-family: ${props => props.theme.fonts.sans};

  p {
    margin-top: 0;
  }

  li > p:first-child {
    display: inline;
    margin-bottom: 1rem;
  }

  li > p:first-child:after {
    content: '';
    display: block;
    margin-bottom: 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0px 0px 0.3em;
    line-height: 1.45;
  }
`

const tinyMixin = css`
  font-size: 11px;

  line-height: 1.45;

  p,
  li,
  ol,
  code,
  pre {
    font-size: 0.8rem;
  }

  h1,
  h2,
  h3 {
    font-size: 1rem;
  }

  h4 {
    font-size: 0.9rem;
  }

  h5 {
    font-size: 0.9rem;
  }

  h6 {
    font-size: 0.9rem;
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
    font-size: 0.9rem;
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

  line-height: 1.6;

  p, li, ol {
    font-size: 1.05rem;
  }

  ul,
  ol {
    margin-left: 0;
    padding-left: 0;

    li {
      list-style-position: inside;
    }

    ol, ul {
      padding-left: 1.1em;
    }
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
    background-color: ${props => props.theme.colors.state.highlight};
  }

  hr {
    border: none;
    margin: 1em 0;
    height: 1px;
    background-color: #d8d8d8;
  }

  a {
    font-weight: bold;
    color: ${props => props.theme.colors.gray.bold};
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
    border-left: 1px solid rgb(216, 216, 216);
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

export const SansSerifText = styled.div<{ isSmall: boolean; isTiny: boolean }>`
  ${mixin}

  ${props =>
    props.isSmall &&
    `
    ${smallMixin}
  `}

  ${props =>
    props.isTiny &&
    `
    ${tinyMixin}
  `}
`
