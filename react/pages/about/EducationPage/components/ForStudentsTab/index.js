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

export default class ForStudents extends Component {
  render() {
    return (
      <div>
        <CenterBox mt={10} mb={7}>
          <Subheadline>
            Give your research a home
          </Subheadline>
          <Description>
            Save documents, images, videos on any topic to clear, visual collections.
          </Description>
        </CenterBox>
        <Screenshot src="https://d2w9rnfcy7mm78.cloudfront.net/1819612/original_7ab7904e928af857a716d08770179fd3.png?1519764799" />

        <CenterBox mt={10} mb={7}>
          <Subheadline>
            Collaborate visually
          </Subheadline>
          <Description>
            Connect collections and invite classmates to work on projects together.
          </Description>
        </CenterBox>
        <Screenshot src="https://d2w9rnfcy7mm78.cloudfront.net/1819616/original_082481d53bf6c73bd0010f53041e5341.png?1519764802" />

        <CenterBox mt={10} mb={7}>
          <Subheadline>
            Find new ideas on Are.na
          </Subheadline>
          <Description>
            Like a wiki, Are.na is a universe of public
            knowledge. Save anything you see to your personal collections.
          </Description>
        </CenterBox>
        <Screenshot src="https://d2w9rnfcy7mm78.cloudfront.net/1819612/original_7ab7904e928af857a716d08770179fd3.png?1519764799" />
      </div>
    );
  }
}
