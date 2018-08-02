import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import exportChannelMutation from 'react/components/ManageChannel/components/ExportChannel/mutations/exportChannel';

import Status from 'react/components/UI/Status';
import GenericButton from 'react/components/UI/GenericButton';
import ButtonGroup from 'react/components/UI/ButtonGroup';

class ExportChannel extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    exportChannel: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
    format: null,
  }

  queueExport = format => async () => {
    const { id, exportChannel } = this.props;

    this.setState({ mode: 'queueing', format });

    try {
      await exportChannel({ variables: { id, format } });
      this.setState({ mode: 'queued' });
    } catch (err) {
      console.error(err);
      this.setState({ mode: 'error' });
    }
  }

  queueExportPDF = this.queueExport('PDF')
  queueExportZIP = this.queueExport('ZIP')
  queueExportHTML = this.queueExport('HTML')

  render() {
    const { mode, format } = this.state;

    return (
      <div>
        <ButtonGroup stretch f={1}>
          <GenericButton onClick={this.queueExportPDF}>
            PDF
          </GenericButton>

          <GenericButton onClick={this.queueExportZIP}>
            ZIP
          </GenericButton>

          <GenericButton onClick={this.queueExportHTML}>
            HTML
          </GenericButton>
        </ButtonGroup>

        {mode !== 'resting' &&
          <Status>
            {{
              error: 'An error has occurred',
              queueing: 'Processing...',
              queued: `Your .${format.toLowerCase()} will be ready for download momentarily and will be emailed to the address associated with your account`,
            }[mode]}
          </Status>
        }
      </div>
    );
  }
}

export default graphql(exportChannelMutation, {
  name: 'exportChannel',
})(ExportChannel);
