import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from '@apollo/client/react/hoc'

import mapErrors from 'v2/util/mapErrors'

import exportChannelMutation from 'v2/components/ManageChannel/components/ExportChannel/mutations/exportChannel'

import Text from 'v2/components/UI/Text'
import GenericButton from 'v2/components/UI/GenericButton'
import ButtonGroup from 'v2/components/UI/ButtonGroup'

class ExportChannel extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    exportChannel: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
    errorMessage: '',
    format: null,
  }

  queueExport = format => async () => {
    const { id, exportChannel } = this.props

    this.setState({ mode: 'queueing', format })

    try {
      await exportChannel({ variables: { id, format } })
      this.setState({ mode: 'queued' })
    } catch (err) {
      this.setState({ mode: 'error', ...mapErrors(err) })
    }
  }

  queueExportPDF = this.queueExport('PDF')
  queueExportZIP = this.queueExport('ZIP')
  queueExportHTML = this.queueExport('HTML')

  render() {
    const { mode, errorMessage, format } = this.state

    return (
      <div>
        <ButtonGroup stretch f={2}>
          <GenericButton onClick={this.queueExportPDF}>PDF</GenericButton>

          <GenericButton onClick={this.queueExportZIP}>ZIP</GenericButton>

          <GenericButton onClick={this.queueExportHTML}>HTML</GenericButton>
        </ButtonGroup>

        {mode !== 'resting' && (
          <Text my={6} f={2} color="state.alert">
            {
              {
                error: errorMessage,
                queueing: 'Processing...',
                queued: `Your .${format.toLowerCase()} will be ready for download momentarily and will be emailed to the address associated with your account`,
              }[mode]
            }
          </Text>
        )}
      </div>
    )
  }
}

export default graphql(exportChannelMutation, {
  name: 'exportChannel',
})(ExportChannel)
