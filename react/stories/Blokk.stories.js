import uuidv4 from 'uuid/v4';
import React from 'react';
import { storiesOf } from '@storybook/react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';

import blokkQuery from 'react/components/Blokk/queries/blokk';
import userQuery from 'react/components/Blokk/components/User/queries/user';
import groupQuery from 'react/components/Blokk/components/Group/queries/group';

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

const UserBlokkWithData = ({ id }) => (
  <Query query={userQuery} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading || error) return <div />;
      if (error) { console.error(error); }
      const { user } = data;
      return <Blokk blokk={user} />;
    }}
  </Query>
);

const GroupBlokkWithData = ({ id }) => (
  <Query query={groupQuery} variables={{ id }}>
    {({ loading, error, data }) => {
      console.log('loading', loading, 'error', error);
      if (loading || error) return <div />;
      if (error) { console.error(error); }
      const { group } = data;
      return <Blokk blokk={group} />;
    }}
  </Query>
);

BlokkWithData.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

UserBlokkWithData.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

GroupBlokkWithData.propTypes = {
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
  )).add('user', () => (
    <Specimen>
      <Grid>
        <UserBlokkWithData id={420} />
      </Grid>
    </Specimen>
  )).add('group', () => (
    <Specimen>
      <Grid>
        <GroupBlokkWithData id={420} />
      </Grid>
    </Specimen>
  ));
