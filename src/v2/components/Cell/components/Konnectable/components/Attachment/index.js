import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';

import attachmentFragment from 'v2/components/Cell/components/Konnectable/components/Attachment/fragments/attachment';

import Box from 'v2/components/UI/Box';
import Text from 'v2/components/UI/Text';
import Generic from 'v2/components/Cell/components/Konnectable/components/Generic';

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

export default class Attachment extends PureComponent {
  static propTypes = {
    attachment: propType(attachmentFragment).isRequired,
  }

  render() {
    const { attachment, ...rest } = this.props;

    if (attachment.src) {
      return (
        <Generic src={attachment.src} title={attachment.title} {...rest} />
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
