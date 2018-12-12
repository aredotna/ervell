import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import feedGroupObjectFragment from 'react/components/Feed/components/FeedGroupObjects/fragments/object';

import Grid from 'react/components/UI/Grid';

import Konnectable from 'react/components/Cell/components/Konnectable';
import Identifiable from 'react/components/Cell/components/Identifiable';

const ObjectGrid = styled(Grid)`
  justify-content: center;
  margin-top: ${x => x.theme.space[6]};
`;

export default class FeedGroupObjects extends PureComponent {
  static propTypes = {
    objects: PropTypes.arrayOf(propType(feedGroupObjectFragment)).isRequired,
  }

  render() {
    const { objects } = this.props;

    return (
      <ObjectGrid>
        {objects.map((object) => {
          const isIdentifiable = object.__typename === 'User' || object.__typename === 'Group';

          if (isIdentifiable) {
            return <Identifiable identifiable={object} />;
          }

          return (
            <Konnectable konnectable={object} key={object.id} />
          );
        })}
      </ObjectGrid>
    );
  }
}
