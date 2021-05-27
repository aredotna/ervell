import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import constants from 'v2/styles/constants'
import Box from 'v2/components/UI/Box'
import HorizontalRule from 'v2/components/UI/HorizontalRule'

import konnectableChannelFragment from 'v2/components/Cell/components/Konnectable/components/KonnectableChannel/fragments/konnectableChannel'
import Text from 'v2/components/UI/Text'
import Count from 'v2/components/UI/Count'

const Row = styled(Box).attrs({
  mb: 9,
  // Accomodate connect menu outline border from getting cut off
  pt: 3,
  pr: 3,
  pl: 3,
})`
  overflow: hidden;

  // Neutralize the padding for the connect outline
  margin-top: -${x => x.theme.space[3]};
  margin-left: -${x => x.theme.space[3]};

  > * {
    flex-wrap: nowrap;
  }
`

const Line = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: ${constants.doubleBlockGutter};
`

const HR = styled(HorizontalRule).attrs({ my: 0, color: 'gray.light' })`
  flex: 1;
  margin-right: ${x => x.theme.space[5]};
`

const CountLine = styled(Text).attrs({
  f: 2,
  underlineLinks: true,
  color: 'gray.medium',
})`
  a:hover {
    color: ${x => x.theme.colors.gray.bold};
  }
`

const ChannelRow = ({ children, channel, ...rest }) => (
  <Row {...rest}>
    {children}

    <Line>
      <HR />

      {channel.counts.contents > 3 && (
        <CountLine>
          <a href={channel.href}>
            +
            <Count
              label="more block"
              amount={Math.floor(channel.counts.contents - 3)}
            />
          </a>
        </CountLine>
      )}
    </Line>
  </Row>
)

ChannelRow.propTypes = {
  channel: propType(konnectableChannelFragment).isRequired,
  children: PropTypes.node.isRequired,
}

export default ChannelRow
