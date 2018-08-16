import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import { graphql } from 'react-apollo';
import { map } from 'underscore';
import PropTypes from 'prop-types';

import connectTwitterQuery from 'react/components/ConnectTwitter/queries/index';
import connectTwitterFragment from 'react/components/ConnectTwitter/fragments/index';
import TitledDialog from 'react/components/UI/TitledDialog';
import Contact from 'react/components/ConnectTwitter/components/Contact/index';

class ConnectTwitter extends Component {
  static propTypes = {
    data: PropTypes.shape({
      me: propType(connectTwitterFragment),
    }).isRequired,
    onClose: PropTypes.func,
  }

  static defaultProps = {
    onClose: () => false,
  }

  state = {
    mode: 'resting',
  }

  render() {
    const { mode } = this.state;
    const { onClose, data } = this.props;

    const Inner = (
      data.loading || !data.me.authenticated_service ?
        '' :
        (map(data.me.authenticated_service.contacts, user => <Contact user={user} />))
    );

    return (
      <TitledDialog
        title="Find friends"
        label={{
          resting: 'Done',
        }[mode]}
        onDone={onClose}
      >
        {Inner}
      </TitledDialog>
    );
  }
}

export default graphql(connectTwitterQuery)(ConnectTwitter);
