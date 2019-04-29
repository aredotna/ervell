import uuidv4 from 'uuid/v4'
import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Box from 'v2/components/UI/Box'
import Modal from 'v2/components/UI/Modal'
import TitledDialog from 'v2/components/UI/TitledDialog'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import Specimen from 'v2/stories/__components__/Specimen'

const OverflowingTitledDialog = () => (
  <TitledDialog
    title="Example form"
    onDone={e => {
      e.preventDefault()
      action('onDone')(e)
    }}
  >
    {Array(100)
      .fill('Overflow')
      .map(filler => (
        <div key={uuidv4()}>{filler}</div>
      ))}
  </TitledDialog>
)

const OverflowingPlainContent = () => (
  <div>
    {Array(100)
      .fill('Overflow')
      .map(filler => (
        <div key={uuidv4()}>{filler}</div>
      ))}
  </div>
)

const SmallPlainContentModal = () => <div>Hello world.</div>

const CustomDialog = ({ children, ...rest }) => (
  <Box border="1px dashed red" p={6} {...rest}>
    {children}
  </Box>
)

CustomDialog.propTypes = {
  children: PropTypes.node.isRequired,
}

storiesOf('Modal', module).add('Modal', () => (
  <Specimen>
    <a
      role="button"
      tabIndex={0}
      onClick={() => new Modal(OverflowingTitledDialog).open()}
    >
      Open overflowing titled dialog modal
    </a>

    <br />

    <a
      role="button"
      tabIndex={0}
      onClick={() => new Modal(OverflowingPlainContent).open()}
    >
      Open overflowing plain content modal
    </a>

    <br />

    <a
      role="button"
      tabIndex={0}
      onClick={() => new Modal(SmallPlainContentModal).open()}
    >
      Open small plain content modal
    </a>

    <br />

    <a
      role="button"
      tabIndex={0}
      onClick={() => new Modal(LoadingIndicator).open()}
    >
      Open loading indicator modal
    </a>

    <br />

    <a
      role="button"
      tabIndex={0}
      onClick={() =>
        new Modal(SmallPlainContentModal, {}, { Dialog: CustomDialog }).open()
      }
    >
      Open small plain content / custom dialog modal
    </a>
  </Specimen>
))
