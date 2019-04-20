import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, alignItems } from 'styled-system';

import constants from 'react/styles/constants';
import { preset } from 'react/styles/functions';

import provideChildrenWithProps from 'react/util/provideChildrenWithProps';

const Container = styled.div`
  display: flex;
  ${preset(space, { my: 7 })}
  ${preset(alignItems, { alignItems: 'flex-start' })}
  ${space}

  > label:first-child {
    margin: 0;
    flex-basis: 15%;
    font-weight: bold;
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  > *:last-child {
    flex: 1;
    margin-right: ${x => x.theme.space[7]};
  }

  ${constants.media.mobile`
    display: block;

    > label:first-child {
      text-align: left;
      padding: 0 0 ${x => x.theme.space[3]} 0;
    }
  `}
`;

export default class LabelledInput extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children, ...rest } = this.props;

    const label = provideChildrenWithProps(children[0], {
      pt: 5,
      pr: 7,
      ...children[0].props,
    });

    const input = children[1];

    return (
      <Container {...rest}>
        {[label, input]}
      </Container>
    );
  }
}
