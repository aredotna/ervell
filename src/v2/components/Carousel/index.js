import styled from 'styled-components'
import Slider from 'react-slick'

const Carousel = styled(Slider)`
  position: relative;
  display: block;
  width 100%;
  box-sizing: border-box;
  user-select: none;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;

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

    &:before,
    &:after {
      content: '';
      display: table;
    }

    &:after {
      clear: both;
    }
  }

  .slick-track,
  .slick-list {
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
    display: none;
    float: left;
    height: 100%;
    min-height: 1px;

    img {
      display: block;
    }

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

  .slick-dots {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .slick-dots li {
    display: inline-block;
    color: ${x => x.theme.colors.gray.semiLight};
  }

  .slick-dots li button {
    display: none;
  }

  .slick-dots li:after {
    content: "●";
    font-size: ${x => x.theme.fontSizesIndexed.lg};
  }

  .slick-dots li.slick-active {
    color: ${x => x.theme.colors.gray.semiBold};
  }
`

export default Carousel
