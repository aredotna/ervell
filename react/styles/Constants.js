import { css } from 'styled-components';

const SIZES = {
  mobile: 640,
};

const media = Object.keys(SIZES)
  .reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (max-width: ${SIZES[label] / 16}em) {
        ${css(...args)}
      }
    `;

    return acc;
  }, {});

const Z_INDEXES = {
  header: 4001,
  dropdown: 4002,
  loader: 5001,
  modal: 6001,
  lightbox: 6001,
  rotate: 7001,
};

export default {
  emptySpaceWidth: '0.33em',
  headerHeight: '50px',
  blockWidth: '315px', // TODO: 19.5em
  blockGutter: '10px', // (legacyUnit / 2) TODO: 1em
  blockAndGutter: '335px', // (blockWidth + blockGutter)
  containerOffset: '100px', // TODO: Something based on real values
  legacyUnit: '20px',
  media,
  z: Z_INDEXES,
};
