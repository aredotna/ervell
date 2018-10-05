import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Query } from 'react-apollo';

// import profileChannelIndexQuery from 'react/components/ProfileChannelIndex/queries/profileChannelIndex';

export default class ProfileChannelIndex extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }

  render() {
    const { id } = this.props;

    return <div>Index for {id}</div>;

    // return (
    //   <Query query={profileChannelIndexQuery} variables={{ id }}>
    //     {({ loading, error, data }) => (
    //       <pre>
    //         {JSON.stringify({ loading, error, data }, null, 2)}
    //       </pre>
    //     )}
    //   </Query>
    // );
  }
}
