import React, { Component } from 'react';
import styled from 'styled-components';

import CenterBox from 'react/pages/about/components/CenterBox';
import { Subheadline, Description } from 'react/pages/about/components/Text';

const Screenshot = styled.img`
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
  display: block;
`;

export default class ForEducators extends Component {
  render() {
    return (
      <div>
        <CenterBox mt={10} mb={7}>
          <Subheadline>
            Create lightweight class resources
          </Subheadline>
          <Description>
            Share readings, media, and assignments in a click with students or colleagues.
          </Description>
        </CenterBox>
        <Screenshot src="https://d2w9rnfcy7mm78.cloudfront.net/1819612/original_7ab7904e928af857a716d08770179fd3.png?1519764799" />

        <CenterBox mt={10} mb={7}>
          <Subheadline>
            Invite students to contribute
          </Subheadline>
          <Description>
            Class members can connect ideas and
            synthesize concepts together by saving to shared collections.
          </Description>
        </CenterBox>
        <Screenshot src="https://d2w9rnfcy7mm78.cloudfront.net/1819616/original_082481d53bf6c73bd0010f53041e5341.png?1519764802" />

        <CenterBox mt={10} mb={7}>
          <Subheadline>
            Connect ideas from across Are.na
          </Subheadline>
          <Description>
            Are.na is a universe of public knowledge.
            Explore new contexts and save anything you find.
          </Description>
        </CenterBox>
        <Screenshot src="https://d2w9rnfcy7mm78.cloudfront.net/1819612/original_7ab7904e928af857a716d08770179fd3.png?1519764799" />
      </div>
    );
  }
}
