import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import lightboxPageQuery from 'react/pages/lightbox/queries/lightboxPage';

import constants from 'react/styles/constants';

import TopBarLayout from 'react/components/UI/Layouts/TopBarLayout';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import BlockLightbox from 'react/components/BlockLightbox';

import Box from 'react/components/UI/Box';

const Container = styled(Box)`
  height: 100vh;
  padding-top: ${constants.topBarHeight};
`;

export default class LightboxPage extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  render() {
    const { id } = this.props;

    return (
      <TopBarLayout>
        <Container>
          <Query query={lightboxPageQuery} variables={{ id }}>
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
                <BlockLightbox block={block} />
              );
            }}
          </Query>
        </Container>
      </TopBarLayout>
    );
  }
}
