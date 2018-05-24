import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

import exportChannelMutation from 'react/components/ManageChannel/components/ExportChannel/mutations/exportChannel';

import OptionLink, { optionLinkPadding } from 'react/components/UI/OptionLink';

import Styles from 'react/styles';

const Status = styled.div`
  max-width: 90%;
  padding: ${optionLinkPadding};
  font-size: ${Styles.Type.size.xs};
  line-height: ${Styles.Type.lineHeight.tall};
  color: ${Styles.Colors.state.alert};
`;

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
        <OptionLink size="xs" onClick={this.queueExportPDF}>
          PDF
        </OptionLink>

        <OptionLink size="xs" onClick={this.queueExportZIP}>
          ZIP
        </OptionLink>

        <OptionLink size="xs" onClick={this.queueExportHTML}>
          HTML
        </OptionLink>

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
