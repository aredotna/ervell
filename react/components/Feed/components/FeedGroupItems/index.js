import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import feedGroupItemFragment from 'react/components/Feed/components/FeedGroupItems/fragments/item';

import Grid from 'react/components/UI/Grid';
import Blokk from 'react/components/Blokk/index';

export default class FeedGroupItems extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(propType(feedGroupItemFragment)).isRequired,
  }

  render() {
    const { items } = this.props;

    console.log('items', items);

    return (
      <Grid>
        {items.map(item => (
          <Blokk blokk={item} />
        ))}
      </Grid>
    );
  }
}
