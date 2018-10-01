import React from 'react';
import styled from 'styled-components';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import Generic from 'react/components/Blokk/components/Generic';
import Connectable from 'react/components/Blokk/components/Connectable';

const Fill = styled(Box).attrs({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})`
  width: 100%;
  height: 100%;
  background-color: ${x => x.theme.colors.gray.light};
`;

const Ext = styled(Text).attrs({
  font: 'narrow',
  f: 9,
  fontWeight: 'bold',
  color: 'gray.medium',
})`
  text-transform: uppercase;
`;

export default class Attachment extends Connectable {
  render() {
    const { attachment, ...rest } = this.props;

    if (attachment.src) {
      return (
        <Generic src={attachment.src} alt={attachment.title} {...rest} />
      );
    }

    return (
      <Fill {...rest}>
        <Ext>
          {attachment.file_extension}
        </Ext>
      </Fill>
    );
  }
}
