import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

import blockLightboxCommentFragment from 'react/components/BlockLightbox/components/BlockLightboxComment/fragments/blockLightboxComment';

export default class BlockLightboxComment extends PureComponent {
  static propTypes = {
    comment: propType(blockLightboxCommentFragment).isRequired,
  }

  render() {
    const { comment, ...rest } = this.props;

    return (
      <Box {...rest}>
        <Box display="flex" alignItems="center" mb={2}>
          <Text f={3} fontWeight="bold" mr={4}>
            <a href={comment.user.href}>
              {comment.user.name}
            </a>
          </Text>

          <Text f={0} color="gray.medium">
            {comment.created_at.toUpperCase()}
          </Text>
        </Box>

        <Box mb={5} pb={5} borderBottom="1px solid" borderColor="gray.hint">
          <Text
            f={3}
            lineHeight={2}
            dangerouslySetInnerHTML={{ __html: comment.body }}
          />
        </Box>
      </Box>
    );
  }
}
