import { css } from 'styled-components'

import { LINE_HEIGHTS } from 'v2/styles/text'

export const BREAKPOINTS = {
  mobile: 640,
  small: 1024,
}

type BreakpointType = typeof BREAKPOINTS

export const MEDIA_QUERIES = Object.keys(BREAKPOINTS).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${BREAKPOINTS[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})

export const Z_INDEXES = {
  header: 4001,
  dropdown: 4002,
  loader: 5001,
  modal: 6001,
  lightbox: 6001,
  rotate: 7001,
}

type ZIndexType = typeof Z_INDEXES

export const SPACING_SCALE = [
  '0',
  '0.125em',
  '0.25em',
  '0.34375em',
  '0.65625em',
  '0.75em',
  '1em', // 6
  '2em', // 7
  '3em', // 8
  '4em', // 9
  '8em',
  '16em',
  '24em',
  '32em',
  '64em',
]

type SpacingScaleType = typeof SPACING_SCALE

export const CONSTANT_VALUES = {
  emptySpaceWidth: '0.33em',
  doubleEmptySpaceWidth: '0.66em',
  headerHeight: '50px',
  blockWidth: '315px', // TODO: 19.5em
  blockGutter: '10px', // (legacyUnit / 2) TODO: 1em
  doubleBlockGutter: '20px', // TODO
  blockAndGutter: '335px', // (blockWidth + blockGutter)
  containerOffset: '100px', // TODO: Something based on real values
  blockPreviewWidth: '200px',
  legacyUnit: '20px',
  // py: 1em (6) + 1rem input inner (16px/13px font-size + 1.125 line-height)
  topBarHeight: `calc((1rem * ${LINE_HEIGHTS.input}) + 2em)`,
}

export const RADII = {
  button: '0.25em',
  regular: '0.25em',
  subtle: '0.125em',
}

type RadiiType = typeof RADII

interface ConstantTypes {
  emptySpaceWidth: string
  doubleEmptySpaceWidth: string
  headerHeight: string
  blockWidth: string
  blockGutter: string
  doubleBlockGutter: string
  blockAndGutter: string
  containerOffset: string
  blockPreviewWidth: string
  legacyUnit: string
  topBarHeight: string
  // TODO give these real types
  media: any
  radii: RadiiType
  breakpoints: BreakpointType
  space: SpacingScaleType
  z: ZIndexType
}

export const constants = {
  ...CONSTANT_VALUES,
  media: MEDIA_QUERIES,
  z: Z_INDEXES,
  breakpoints: BREAKPOINTS,
  space: SPACING_SCALE,
  radii: RADII,
} as ConstantTypes

export default constants
