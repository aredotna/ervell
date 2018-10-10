import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Text from 'react/components/UI/Text';

const Container = styled.span`
  position: relative;
  display: inline-block;
  margin-left: ${x => x.theme.space[3]};
  background-color: ${x => x.theme.colors.gray.light};
  border-radius: 0.125em;
  padding: ${x => `0 ${x.theme.space[3]}`}
`;

const Ext = styled(Text).attrs({
  f: 1,
  lineHeight: 1,
  font: 'narrow',
  fontWeight: 'bold',
  color: 'gray.medium',
})`
  position: relative;
  display: inline-block;
  text-transform: uppercase;
`;

const MetadataFileExtension = ({ ext, ...rest }) => (
  <Container {...rest}>
    <Ext>
      {ext}
    </Ext>
  </Container>
);

MetadataFileExtension.propTypes = {
  ext: PropTypes.string.isRequired,
};

export default MetadataFileExtension;
