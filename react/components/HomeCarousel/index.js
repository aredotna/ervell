import React, { Component } from 'react';
import styled from 'styled-components';

import Carousel from '../Carousel/index';
import Type from '../../styles/Type';

const mobileBreakpoint = 1024;

const Slide = styled.div`
  text-align: center;
  transition: opacity .5s ease-in-out;
  opacity: ${props => (props.className.includes('slick-center') ? 1 : 0.3)};
  cursor: pointer;
  @media (max-width: ${mobileBreakpoint}px) {
    width: 90%;
  }
`;

const Inner = styled.div`
  padding: 2rem 2rem 0;
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
  max-height: 400px;
  width: auto;
  padding-bottom: 1rem;
  user-drag: none;

  @media (max-width: ${mobileBreakpoint}px) {
    max-height: 220px;
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
            <Image alt="iphone screenshot" src="https://d2w9rnfcy7mm78.cloudfront.net/1586587/original_971cf68a81483a8c80a9f574a62ec24e.png" />
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
            <Image alt="desktop screenshot / meg" src="https://d2w9rnfcy7mm78.cloudfront.net/1819604/original_ab9278398679a8b336190f220aea0649.png" />
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
            <Image alt="desktop screenshot / connections" src="https://d2w9rnfcy7mm78.cloudfront.net/1819612/original_7ab7904e928af857a716d08770179fd3.png" />
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
