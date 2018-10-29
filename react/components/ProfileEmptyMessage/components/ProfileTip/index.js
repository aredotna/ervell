import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import setMeFlagsMutation from 'react/components/ProfileEmptyMessage/components/ProfileTips/mutations/setMeFlags';

import Text from 'react/components/UI/Text';
import Alert from 'react/components/UI/Alert';

export default class ProfileTip extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  dismiss = setMeFlags => () => {
    const { name } = this.props;

    return setMeFlags({
      variables: {
        flags: [{
          name, value: true,
        }],
      },
    }).catch(console.error.bind(console));
  }

  render() {
    const { children } = this.props;

    return (
      <Mutation mutation={setMeFlagsMutation}>
        {setMeFlags => (
          <Alert
            bg="gray.hint"
            mb={6}
            onClose={this.dismiss(setMeFlags)}
          >
            <Text f={6} lineHeight={2}>
              {children}
            </Text>
          </Alert>
        )}
      </Mutation>
    );
  }
}
