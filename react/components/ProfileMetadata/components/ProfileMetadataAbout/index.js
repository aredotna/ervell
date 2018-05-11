import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';

import profileMetadataAboutFragment from 'react/components/ProfileMetadata/components/ProfileMetadataAbout/fragments/profileMetadataAbout';

import Pocket from 'react/components/UI/Pocket';

export default class ProfileMetadataAbout extends Component {
  static propTypes = {
    user: propType(profileMetadataAboutFragment).isRequired,
  }

  render() {
    const { user } = this.props;

    return (
      <Pocket title="About">
        <div dangerouslySetInnerHTML={{ __html: user.about }} />

        {/* TODO: Start private channel */}
      </Pocket>
    );
  }
}
