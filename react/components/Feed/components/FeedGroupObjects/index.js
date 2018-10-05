import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import feedGroupObjectFragment from 'react/components/Feed/components/FeedGroupObjects/fragments/object';

import Grid from 'react/components/UI/Grid';
import Blokk from 'react/components/Blokk/index';

const ObjectGrid = styled(Grid)`
  justify-content: center;
  margin-top: ${x => x.theme.space[6]};
`;

export default class FeedGroupObjects extends Component {
  static propTypes = {
    objects: PropTypes.arrayOf(propType(feedGroupObjectFragment)).isRequired,
  }

  render() {
    const { objects } = this.props;

    return (
      <ObjectGrid>
        {objects.map(object => (
          <Blokk blokk={object} />
        ))}
      </ObjectGrid>
    );
  }
}
