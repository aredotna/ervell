import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import blockPageQuery from 'react/pages/block/queries/blockPage';

import constants from 'react/styles/constants';

import Box from 'react/components/UI/Box';
import TopBarLayout from 'react/components/UI/Layouts/TopBarLayout';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import BlockLightbox from 'react/components/BlockLightbox';
import BlockPageMetaTags from 'react/pages/block/components/BlockPageMetaTags';

const Container = styled(Box)`
  height: 100vh;
  padding-top: ${constants.topBarHeight};
`;

export default class BlockPage extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  render() {
    const { id } = this.props;

    return (
      <TopBarLayout>
        <Container>
          <Query query={blockPageQuery} variables={{ id }}>
            {({ data, loading, error }) => {
              if (loading) {
                return <LoadingIndicator />;
              }

              if (error) {
                return (
                  <ErrorAlert>
                    {error.message}
                  </ErrorAlert>
                );
              }

              const { block } = data;

              return (
                <React.Fragment>
                  <BlockPageMetaTags block={block} />

                  <BlockLightbox block={block} />
                </React.Fragment>
              );
            }}
          </Query>
        </Container>
      </TopBarLayout>
    );
  }
}
