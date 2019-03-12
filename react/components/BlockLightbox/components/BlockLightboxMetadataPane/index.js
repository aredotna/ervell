import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';
import { Query } from 'react-apollo';

import blockLightboxFoldQuery from 'react/components/BlockLightbox/components/BlockLightboxMetadataPane/queries/blockLightboxFold';
import blockLightboxMetadataPaneFragment from 'react/components/BlockLightbox/components/BlockLightboxMetadataPane/fragments/blockLightboxMetadataPane';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import Header from 'react/components/BlockLightbox/components/BlockLightboxMetadataPane/components/Header';
import BlockLightboxActions from 'react/components/BlockLightbox/components/BlockLightboxActions';
import BlockLightboxConnections from 'react/components/BlockLightbox/components/BlockLightboxConnections';
import BlockLightboxComments from 'react/components/BlockLightbox/components/BlockLightboxComments';

export default class BlockLightboxMetadataPane extends PureComponent {
  static propTypes = {
    block: propType(blockLightboxMetadataPaneFragment).isRequired,
  }

  render() {
    const { block } = this.props;

    return (
      <Box
        flex="1"
        px={7}
        pt={4}
        pb={8}
        height="100%"
        overflowScrolling
      >
        <Text
          mb={5}
          f={5}
          fontWeight="bold"
          hyphenate
          dangerouslySetInnerHTML={{ __html: block.title }}
        />

        <Text f={1} lineHeight={2} color="gray.medium">
          <time
            dateTime={block.created_at_timestamp}
            title={block.created_at_timestamp}
          >
            Added {block.created_at} by{' '}
          </time>

          <a href={block.user.href}>
            <strong>{block.user.name}</strong>
          </a>

          {block.created_at !== block.updated_at &&
            <React.Fragment>
              <br />

              <time
                dateTime={block.updated_at_timestamp}
                title={block.updated_at_timestamp}
              >
                Last updated {block.updated_at}
              </time>
            </React.Fragment>
          }
        </Text>

        <Header mt={8}>
          Info
        </Header>

        {block.description &&
          <Text
            f={3}
            lineHeight={2}
            dangerouslySetInnerHTML={{ __html: block.description }}
            breakWord
          />
        }

        <Text my={6} f={1} fontWeight="bold" lineHeight={2}>
          <BlockLightboxActions block={block} />
        </Text>

        <Query query={blockLightboxFoldQuery} variables={{ id: block.id }} ssr={false}>
          {({ loading, error, data }) => {
            if (error) {
              return (
                <ErrorAlert>
                  {error.message}
                </ErrorAlert>
              );
            }

            return (
              <React.Fragment>
                <Header mt={8}>
                  Connections
                </Header>

                <BlockLightboxConnections
                  block={{ ...block, ...data.block }}
                  loading={loading}
                  mt={4}
                />

                <Header mt={8}>
                  Comments
                </Header>

                <BlockLightboxComments
                  block={{ ...block, ...data.block }}
                  loading={loading}
                  mt={4}
                />
              </React.Fragment>
            );
          }}
        </Query>
      </Box>
    );
  }
}
