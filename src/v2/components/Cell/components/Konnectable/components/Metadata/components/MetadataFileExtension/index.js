import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { space } from 'styled-system'

import constants from 'v2/styles/constants'

import { fractional } from 'v2/styles/mixins'

import { preset } from 'v2/styles/functions'

import Text from 'v2/components/UI/Text'

const Container = styled.span`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  background-color: ${x => x.theme.colors.gray.light};
  border-radius: ${constants.radii.subtle};
  ${preset(space, { py: 0, px: 3, ml: 3 })}
`

const Ext = styled(Text).attrs({
  f: 0,
  font: 'narrow',
  fontWeight: 'bold',
  color: 'gray.medium',
})`
  position: relative;
  display: inline-block;
  text-transform: uppercase;
  ${fractional}
`

const MetadataFileExtension = ({ ext, ...rest }) => (
  <Container {...rest}>
    <Ext>{ext}</Ext>
  </Container>
)

MetadataFileExtension.propTypes = {
  ext: PropTypes.string.isRequired,
}

export default MetadataFileExtension
