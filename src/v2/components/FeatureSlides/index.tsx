import React from 'react'
import styled from 'styled-components'

import Carousel from 'v2/components/Carousel'
import Text from 'v2/components/UI/Text/index'
import { FONT_SIZES } from 'v2/styles/text'
import slides from './slides.js'

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

const Copy = styled(Text).attrs({
  f: 3,
  boldLinks: true,
  color: 'gray.bold',
})`
  width: 70%;
  line-height: 1.5;
  text-align: center;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 90%;
  }
`

const Headline = styled(Text).attrs({
  f: FONT_SIZES.home.lg,
  color: 'gray.block',
})`
  font-weight: normal;
  margin-bottom: 1rem;
`

const A = styled.a`
  font-weight: bold;
  cursor: pointer !important;

  &:hover {
    color: ${props => props.theme.colors.gray.bold};
  }
`

const Image = styled.img`
  max-height: 400px;
  max-width: 650px;
  width: auto;
  padding-bottom: 1rem;
  user-drag: none;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    max-height: 220px;
  }
`

interface DescriptiveCarouselProps {
  slides: {
    id: string
    headline: string
    copy: string
    image: string
    link?: string
  }[]
}

export const DescriptiveCarousel: React.FC<DescriptiveCarouselProps> = ({
  slides,
}) => {
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
    <>
      <Carousel {...settings}>
        {slides.map(slide => (
          <Slide key={slide.id}>
            <Inner>
              <Image alt={slide.headline} src={slide.image} />
              {slide.link ? (
                <A href={slide.link} target="_blank" rel="noopener noreferrer">
                  <Headline>{slide.headline}</Headline>
                </A>
              ) : (
                <Headline>{slide.headline}</Headline>
              )}
              <Copy dangerouslySetInnerHTML={{ __html: slide.copy }} />
            </Inner>
          </Slide>
        ))}
      </Carousel>
    </>
  )
}

const FeatureCarouselWithSlides: React.FC = () => {
  return <DescriptiveCarousel slides={slides} />
}

export default FeatureCarouselWithSlides
