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
        <CenterBox mt={9} mb={6}>
          <Subheadline>
            Create lightweight class resources
          </Subheadline>
          <Description>
            Share readings, media, and assignments in a click with students or colleagues.
          </Description>
        </CenterBox>
        <Screenshot src="https://d2w9rnfcy7mm78.cloudfront.net/3017939/original_38f901b4a39979dc6b6958397640bfd1.png?1541873532" />

        <CenterBox mt={9} mb={6}>
          <Subheadline>
            Invite students to contribute
          </Subheadline>
          <Description>
            Class members can connect ideas and
            synthesize concepts together by saving to shared collections.
          </Description>
        </CenterBox>
        <Screenshot src="https://d2w9rnfcy7mm78.cloudfront.net/3017942/original_6b4fcbef6cc6fcc461fb8b9c5466fdc7.png?1541873535" />

        <CenterBox mt={9} mb={6}>
          <Subheadline>
            Connect ideas from across Are.na
          </Subheadline>
          <Description>
            Are.na is a universe of public knowledge.
            Explore new contexts and save anything you find.
          </Description>
        </CenterBox>
        <Screenshot src="https://d2w9rnfcy7mm78.cloudfront.net/3017937/original_f0f9212098c0b5cfe1738b446823b0a3.png?1541873526" />
      </div>
    );
  }
}
