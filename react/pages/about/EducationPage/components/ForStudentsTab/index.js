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
        <Screenshot src="https://d2w9rnfcy7mm78.cloudfront.net/3017938/original_a5b3f6e3200005d201afef2fdb8f0f11.png?1541873529" />

        <CenterBox mt={10} mb={7}>
          <Subheadline>
            Collaborate visually
          </Subheadline>
          <Description>
            Connect collections and invite classmates to work on projects together.
          </Description>
        </CenterBox>
        <Screenshot src="https://d2w9rnfcy7mm78.cloudfront.net/3017941/original_f85acc4b4c2b381f74344b856041240f.png?1541873535" />

        <CenterBox mt={10} mb={7}>
          <Subheadline>
            Find new ideas on Are.na
          </Subheadline>
          <Description>
            Like a wiki, Are.na is a universe of public
            knowledge. Save anything you see to your personal collections.
          </Description>
        </CenterBox>
        <Screenshot src="https://d2w9rnfcy7mm78.cloudfront.net/3017943/original_c852f944421a96c8ff1753cc843f78b1.png?1541873535" />
      </div>
    );
  }
}
