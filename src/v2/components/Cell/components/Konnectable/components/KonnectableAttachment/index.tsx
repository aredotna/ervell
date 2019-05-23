import React from 'react'
import styled from 'styled-components'

import { Mode } from 'v2/components/Cell/components/Konnectable/types'
import { KonnectableAttachment as KonnectableAttachmentData } from '__generated__/KonnectableAttachment'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import KonnectableGeneric from 'v2/components/Cell/components/Konnectable/components/KonnectableGeneric'

const Fill = styled(Box).attrs({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})`
  width: 100%;
  height: 100%;
  background-color: ${x => x.theme.colors.gray.light};
`

const Ext = styled(Text).attrs({
  font: 'narrow',
  f: 9,
  fontWeight: 'bold',
  color: 'gray.medium',
})`
  text-transform: uppercase;
`

interface Props {
  attachment: KonnectableAttachmentData
  mode: Mode
}

const KonnectableAttachment: React.FC<Props> = ({
  attachment,
  mode,
  ...rest
}) => {
  if (attachment.src) {
    return (
      <KonnectableGeneric
        src={attachment.src}
        title={attachment.title}
        mode={mode}
        {...rest}
      />
    )
  }

  return (
    <Fill {...rest}>
      <Ext>{attachment.file_extension}</Ext>
    </Fill>
  )
}

export default KonnectableAttachment
