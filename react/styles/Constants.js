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

export default {
  emptySpaceWidth: '0.33em',
  headerHeight: '50px',
  blockWidth: '315px', // TODO: 19.5em
  blockGutter: '10px', // TODO: 1em
  media,
};
