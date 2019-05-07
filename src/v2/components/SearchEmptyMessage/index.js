import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Text from 'v2/components/UI/Text'

const Copy = styled(Text)`
  a {
    font-weight: bold;
  }
  a:hover {
    color: ${x => x.theme.colors.gray.base};
  }
`

export default class SearchEmptyMessage extends PureComponent {
  static propTypes = {
    term: PropTypes.string.isRequired,
  }

  render() {
    const { term } = this.props

    return (
      <Copy f={6} my={8} color="gray.medium" lineHeight={2}>
        {`No results for '${term}'`}
      </Copy>
    )
  }
}
