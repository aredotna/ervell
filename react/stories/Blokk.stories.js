import uuidv4 from 'uuid/v4';
import React from 'react';
import { storiesOf } from '@storybook/react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';

import blokkQuery from 'react/components/Blokk/queries/blokk';

import Specimen from 'react/stories/__components__/Specimen';

import Blokk from 'react/components/Blokk';
import Grid from 'react/components/UI/Grid';

const BlokkWithData = ({ id }) => (
  <Query query={blokkQuery} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading || error) return <div />;
      if (error) { console.error(error); }
      const { blokk } = data;
      return <Blokk blokk={blokk} />;
    }}
  </Query>
);

BlokkWithData.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

storiesOf('Blokk', module)
  .add('default', () => (
    <Specimen>
      <Grid>
        {Array(10).fill(undefined).map((_, i) => (
          <BlokkWithData key={uuidv4()} id={i} />
        ))}
      </Grid>
    </Specimen>
  ));
