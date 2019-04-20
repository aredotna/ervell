import React, { Component } from 'react';
import styled from 'styled-components';
import { themeGet } from 'styled-system';

import constants from 'v2/styles/constants';

import Box, { mixin } from 'v2/components/UI/Box';
import { GenericButtonLink as Button } from 'v2/components/UI/GenericButton';
import {
  Headline,
  Subheadline,
  Description,
} from 'v2/pages/about/components/Text';

const CTA = styled(Box).attrs({
  py: 10,
  px: 3,
  borderBottom: '1px solid',
  borderColor: themeGet('colors.gray.regular'),
})``;

const CaseStudies = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  ${constants.media.small`
    flex-direction: column;
    align-items: center;
  `}
`;

const CaseStudy = styled.a.attrs({
  mx: 6,
  width: ['90%', 'auto', 'auto'],
  mb: ['3em', '3em', 0],
})`
  ${mixin}
  max-width: 225px;
  text-decoration: none;
`;

const Thumb = styled.img`
  max-width: 100%;
`;

const Title = styled(Subheadline).attrs({
  fontSize: 5,
  align: 'left',
  mx: 0,
})``;

const Copy = styled(Description).attrs({
  align: 'left',
  px: 0,
})``;

const CenterBox = styled(Box).attrs({
  display: 'flex',
  align: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  my: 7,
})``;

export default class CaseStudiesCta extends Component {
  render() {
    return (
      <CTA>
        <Headline pb={7}>How are teachers and students using Are.na?</Headline>
        <CaseStudies>
          <CaseStudy href="https://www.are.na/lucy-siyao-liu/orthographies">
            <Thumb src="https://d2w9rnfcy7mm78.cloudfront.net/2988720/original_37979b237534ae7e6b18823f289e25df.png?1541428472" />
            <Title>Orthographies at MIT</Title>
            <Copy>
              Lucy Siyao Liu asked her architecture and design students to use
              Are.na to record notes and prototypes as they created automated
              drawing tools.
            </Copy>
          </CaseStudy>
          <CaseStudy href="https://www.are.na/risd-experimental-publishing-studio-2018">
            <Thumb src="https://d2w9rnfcy7mm78.cloudfront.net/2988718/original_fd78f771f122eae79c72f0275a5a4525.png?1541428460" />
            <Title>RISD Experimental Publishing Studio</Title>
            <Copy>
              Artist Paul Soulellis shared a wealth of readings on publishing
              and technology with graphic design students at RISD.
            </Copy>
          </CaseStudy>
          <CaseStudy href="https://www.are.na/edouard-urcades/core-studio-interaction-spring-2018">
            <Thumb src="https://d2w9rnfcy7mm78.cloudfront.net/2988719/original_f438cb5c09c9c541cb687f112cb591d0.png?1541428465" />
            <Title>Parsons Core Interaction Studio</Title>
            <Copy>
              Édouard U. posted assignments and inspiration to Are.na for each
              class of an interaction design course at Parsons.
            </Copy>
          </CaseStudy>
        </CaseStudies>
        <CenterBox>
          <Button
            f={5}
            mt={8}
            py={6}
            href="https://www.are.na/arena-commons/teaching-on-are-na"
          >
            See More Examples
          </Button>
          <Description>
            or set up a class using the{' '}
            <a href="http://s3.amazonaws.com/arena-attachments/2626971/31f570550633bbd2c323fa10638098e6.pdf?1535653283">
              step by step guide
            </a>
            .
          </Description>
        </CenterBox>
      </CTA>
    );
  }
}
