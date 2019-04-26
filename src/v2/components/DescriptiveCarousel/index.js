import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Carousel from 'v2/components/Carousel'

const MOBILE_BREAKPOINT = 1024

const Slide = styled.div`
  text-align: center;
  transition: opacity 0.5s ease-in-out;
  opacity: ${props => (props.className.includes('slick-center') ? 1 : 0.3)};
  cursor: grab;
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 90%;
  }
`

const Inner = styled.div`
  padding: 2rem 2rem 1rem;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Copy = styled.p`
  font-size: ${x => x.theme.fontSizesIndexed.base};
  width: 70%;
  line-height: 1.5;
  text-align: center;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 90%;
  }
`

const Headline = styled.h2`
  font-weight: normal;
  margin-bottom: 1rem;
`

const Image = styled.img`
  max-height: 400px;
  width: auto;
  padding-bottom: 1rem;
  user-drag: none;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    max-height: 220px;
  }
`

class DescriptiveCarousel extends Component {
  static defaultProps = {
    slides: [],
  }

  static propTypes = {
    slides: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        headline: PropTypes.any.isRequired,
        copy: PropTypes.string,
        image: PropTypes.string.isRequired,
        link: PropTypes.string,
      })
    ),
  }
  render() {
    const { slides } = this.props

    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      swipe: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '25%',
      focusOnSelect: true,
      autoplay: true,
      autoplaySpeed: 9000,
      responsive: [
        {
          breakpoint: MOBILE_BREAKPOINT,
          settings: {
            centerPadding: '0',
            dots: true,
            appendDots: dots => <ul>{dots}</ul>,
          },
        },
      ],
    }

    return (
      <Carousel {...settings}>
        {slides.map(slide => (
          <Slide key={slide.id}>
            <Inner>
              <Image alt={slide.headline} src={slide.image} />
              {slide.link ? (
                <a href={slide.link} target="_blank" rel="noopener noreferrer">
                  <Headline>{slide.headline}</Headline>
                </a>
              ) : (
                <Headline>{slide.headline}</Headline>
              )}
              <Copy dangerouslySetInnerHTML={{ __html: slide.copy }} />
            </Inner>
          </Slide>
        ))}
      </Carousel>
    )
  }
}

export default DescriptiveCarousel
