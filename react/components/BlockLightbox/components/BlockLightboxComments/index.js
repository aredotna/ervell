import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import blockLightboxCommentsQuery from 'react/components/BlockLightbox/components/BlockLightboxComments/queries/blockLightboxComments';

import Box from 'react/components/UI/Box';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import BlockLightboxComment from 'react/components/BlockLightbox/components/BlockLightboxComment';
import BlockLightboxAddComment from 'react/components/BlockLightbox/components/BlockLightboxAddComment';

export default class BlockLightboxComments extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  render() {
    const { id, ...rest } = this.props;

    return (
      <Box {...rest}>
        <Query query={blockLightboxCommentsQuery} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <LoadingIndicator f={4} />
              );
            }

            if (error) {
              return error.message;
            }

            const { block: { comments } } = data;

            return comments.map(comment =>
              <BlockLightboxComment mb={6} key={comment.id} comment={comment} />);
          }}
        </Query>

        <BlockLightboxAddComment id={id} />
      </Box>
    );
  }
}
