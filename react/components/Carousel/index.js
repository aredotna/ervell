import styled from 'styled-components';
import Slider from 'react-slick';

const Carousel = styled(Slider)`
  position: relative;
  display: block;
  box-sizing: border-box;
  user-select: none;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
  width 100%;

  .slick-list {
    position: relative;
    overflow: hidden;
    display: block;
    margin: 0;
    padding: 0;

    &:focus {
      outline: none;
    }
    
    &.dragging {
      cursor: pointer;
      cursor: hand;
    }
  }

  .slick-track, .slick-list {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .slick-track {
    position: relative;
    left: 0;
    top: 0;
    display: block;
    margin-left: auto;
    margin-right: auto;

    &:before,
    &:after {
        content: "";
        display: table;
    }

    &:after {
        clear: both;
    }
  }

  &.slick-loading .slick-track {
    visibility: hidden;
  }

  .slick-slide {
    float: left;
    height: 100%;
    min-height: 1px;

    img {
        display: block;
    }

    display: none;

    &.dragging img {
      pointer-events: none;
    }

  }

  &.slick-loading .slick-slide {
    visibility: hidden;
  }
  &.slick-initialized .slick-slide {
    display: block;
  }
  &.slick-loading .slick-slide img {
    display: none;
  }
  
`;

export default Carousel;
