import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Backbone from 'backbone';

import GenericButton from 'react/components/UI/GenericButton';

import mediator from 'lib/mediator.coffee';
import InlineConnectIntegrationView from 'components/connect/integration/inline/view.coffee';

export default class LegacyConnect extends Component {
  static propTypes = {
    connectable_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    connectable_type: PropTypes.oneOf(['Block', 'Channel']).isRequired,
    onConnectionAdded: PropTypes.func.isRequired,
    onConnectionRemoved: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  componentDidUpdate() {
    if (!this.connectEl) return;

    const {
      connectable_id,
      connectable_type,
      onConnectionAdded,
      onConnectionRemoved,
    } = this.props;

    const CONNECTION_ADDED_EVENT_NAME = `connection:added:${connectable_id}`;
    const CONNECTION_REMOVED_EVENT_NAME = `connection:removed:${connectable_id}`;

    mediator.off(CONNECTION_ADDED_EVENT_NAME, null, this);
    mediator.off(CONNECTION_REMOVED_EVENT_NAME, null, this);

    const model = new Backbone.Model({
      id: connectable_id,
      base_class: connectable_type,
    });

    const view = new InlineConnectIntegrationView({ model });

    $(this.connectEl).html(view.render().$el);

    mediator.on(CONNECTION_ADDED_EVENT_NAME, onConnectionAdded, this);
    mediator.on(CONNECTION_REMOVED_EVENT_NAME, onConnectionRemoved, this);

    view.once('remove', () => {
      this.setState({ mode: 'resting' });
    });
  }

  openConnect = () => {
    this.setState({ mode: 'active' });
  }

  render() {
    const { mode } = this.state;

    return (
      <div>
        {mode === 'resting' &&
          <GenericButton onClick={this.openConnect} size="xs">
            Connect &rarr;
          </GenericButton>
        }

        {mode === 'active' &&
          <div ref={(el) => { this.connectEl = el; }} />
        }
      </div>
    );
  }
}
