import React, { PureComponent } from 'react'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import BlockLightboxCommentDeleteButton from 'v2/components/BlockLightbox/components/BlockLightboxCommentDeleteButton'

import blockLightboxCommentFragment from 'v2/components/BlockLightbox/components/BlockLightboxComment/fragments/blockLightboxComment'

export default class BlockLightboxComment extends PureComponent {
  static propTypes = {
    comment: propType(blockLightboxCommentFragment).isRequired,
  }

  render() {
    const { comment, ...rest } = this.props

    return (
      <Box {...rest}>
        <Box display="flex" alignItems="center" mb={2}>
          <Text f={3} fontWeight="bold">
            <a href={comment.user.href}>{comment.user.name}</a>
          </Text>

          <Text mx={4} f={0} color="gray.medium" textTransform="uppercase">
            {comment.created_at}
          </Text>

          {comment.can.destroy && (
            <Box flex="1" textAlign="right">
              <BlockLightboxCommentDeleteButton
                id={comment.id}
                f={0}
                color="gray.medium"
                textTransform="uppercase"
                underlineLinks
              />
            </Box>
          )}
        </Box>

        <Box mb={5} pb={5} borderBottom="1px solid" borderColor="gray.hint">
          <Text
            f={3}
            lineHeight={2}
            boldLinks
            dangerouslySetInnerHTML={{ __html: comment.body }}
          />
        </Box>
      </Box>
    )
  }
}
