import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import fullBlockCommentsFragment from 'v2/components/FullBlock/components/FullBlockComments/fragments/fullBlockComments'

import Box from 'v2/components/UI/Box'
import FullBlockComment from 'v2/components/FullBlock/components/FullBlockComment'
import FullBlockAddComment from 'v2/components/FullBlock/components/FullBlockAddComment'

export default class FullBlockComments extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    block: propType(fullBlockCommentsFragment).isRequired,
  }

  render() {
    const { block, loading, ...rest } = this.props

    return (
      <Box {...rest}>
        {!loading &&
          block.comments.map(comment => (
            <FullBlockComment mb={6} key={comment.id} comment={comment} />
          ))}

        <FullBlockAddComment id={block.id} />
      </Box>
    )
  }
}
