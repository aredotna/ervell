import React, { Component } from 'react';
import styled from 'styled-components';

import Carousel from '../Carousel/index';
import Type from '../../styles/Type';

const mobileBreakpoint = 1024;

const Slide = styled.div`
  text-align: center;
  transition: opacity .5s ease-in-out;
  opacity: ${props => (props.className.includes('slick-center') ? 1 : 0.3)};
`;

const Inner = styled.div`
  padding: 3rem;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Copy = styled.p`
  font-size: ${Type.base};
  width: 70%;
  line-height: 1.5;
  text-align: left;

  @media (max-width: ${mobileBreakpoint}px) {
    width: 90%;
  }
`;

const Headline = styled.h2`
  font-weight: normal;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  max-height: 450px;
  width: auto;
  padding-bottom: 1rem;
  user-drag: none;

  @media (max-width: ${mobileBreakpoint}px) {
    height: 300px;
  }
`;

class HomeCarousel extends Component {
  render() {
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
      responsive: [{
        breakpoint: mobileBreakpoint,
        settings: {
          centerPadding: '0',
          dots: true,
          appendDots: dots => <ul>{dots}</ul>,
        },
      }],
    };
    return (
      <Carousel {...settings}>
        <Slide>
          <Inner>
            <Image alt="iphone screenshot" src="https://d2w9rnfcy7mm78.cloudfront.net/1586588/original_ac9783753f207990907118d62cae38bf.png" />
            <Headline>
              Save and organize anything
            </Headline>
            <Copy>
              Easily add any piece of content to Are.na from your phone,
              your browser, or your desktop.
              Everything lives in flexible collections called channels.
            </Copy>
          </Inner>
        </Slide>
        <Slide>
          <Inner>
            <Image alt="iphone screenshot" src="https://d2w9rnfcy7mm78.cloudfront.net/1813617/original_4f8ed79a8ab1e5a2ff58d1bf4a75c2a8.png" />
            <Headline>
              Learn from your links
            </Headline>
            <Copy>
              Save anything you see on Are.na to your channels.
              Explore related topics by following connections between channels
            </Copy>
          </Inner>
        </Slide>
        <Slide>
          <Inner>
            <Image alt="iphone screenshot" src="https://d2w9rnfcy7mm78.cloudfront.net/1201607/original_c2026c305f861e20a9e01cbb67ddf352.png" />
            <Headline>
              Build ideas together
            </Headline>
            <Copy>
              Work on channels privately or collaborate with others.
              Either way, the entire Are.na community is your knowledge base.
            </Copy>
          </Inner>
        </Slide>
      </Carousel>
    );
  }
}

export default HomeCarousel;
