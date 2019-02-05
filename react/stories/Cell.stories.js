import uuidv4 from 'uuid/v4';
import React from 'react';
import { storiesOf } from '@storybook/react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import identifiableCellFragment from 'react/components/Cell/components/Identifiable/fragments/identifiableCell';
import konnectableCellFragment from 'react/components/Cell/components/Konnectable/fragments/konnectableCell';

import Specimen from 'react/stories/__components__/Specimen';

import Grid from 'react/components/UI/Grid';
import Cell from 'react/components/Cell';

import BLOKK_QUERY from 'react/components/Cell/components/Konnectable/queries/blokk';

const IDENTIFIABLE_QUERY = gql`
  query {
    identity(id: 666) {
      identifiable {
        ... IdentifiableCell
      }
    }
  }
  ${identifiableCellFragment}
`;

storiesOf('Cell', module)
  .add('konnectables', () => (
    <Specimen>
      <Grid>
        {Array(10).fill(undefined).map((_, id) => (
          <Query key={uuidv4()} query={BLOKK_QUERY} variables={{ id }}>
            {({ data, loading, error }) => {
              if (loading || error) return '';

              const { blokk } = data;

              return (
                <Cell.Konnectable konnectable={blokk} />
              );
            }}
          </Query>
        ))}
      </Grid>
    </Specimen>
  ))
  .add('indentifiables', () => (
    <Specimen>
      <Grid>
        {Array(10).fill(undefined).map(() => (
          <Query key={uuidv4()} query={IDENTIFIABLE_QUERY}>
            {({ data, loading, error }) => {
              if (loading || error) return '';

              const { identity: { identifiable } } = data;

              return (
                <Cell.Identifiable identifiable={identifiable} />
              );
            }}
          </Query>
        ))}
      </Grid>
    </Specimen>
  ))
  .add('konnectable edge cases', () => (
    <Specimen>
      <Grid>
        <Query query={gql`{ channel(id: 1) { ...KonnectableCell } } ${konnectableCellFragment}`}>
          {({ data, loading, error }) => {
            if (loading || error) return '';
            return (
              <React.Fragment>
                <Cell.Konnectable
                  konnectable={{
                    ...data.channel,
                    truncatedTitle: 'things i found google image searching a religious manuscript generated from L Ron...',
                  }}
                />
                <Cell.Konnectable
                  konnectable={{
                    ...data.channel,
                    truncatedTitle: 'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',
                  }}
                />
              </React.Fragment>
            );
          }}
        </Query>
      </Grid>
    </Specimen>
  ))
  .add('indentifiable edge cases', () => (
    <Specimen>
      <Grid>
        <Query query={gql`{ group(id: 1) { ...IdentifiableCell } } ${identifiableCellFragment}`}>
          {({ data, loading, error }) => {
            if (loading || error) return '';
            return (
              <React.Fragment>
                <Cell.Identifiable
                  identifiable={{
                    ...data.group,
                    name: 'The Society For Societal Collapse',
                  }}
                />
                <Cell.Identifiable
                  identifiable={{
                    ...data.group,
                    name: 'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',
                  }}
                />
              </React.Fragment>
            );
          }}
        </Query>
      </Grid>
    </Specimen>
  ));
