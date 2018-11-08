import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import profilePageIdentifiableFragment from 'react/pages/profile/ProfilePage/fragments/profilePageIdentifiable';


import EmptyMessageOrComponent from 'react/pages/profile/ProfilePage/components/EmptyMessageOrComponent';
import ProfileContents from 'react/components/ProfileContents';

import ProfileChannels from 'react/components/ProfileChannels';
import ProfileChannelIndex from 'react/components/ProfileChannelIndex';
import ProfileFollows from 'react/components/ProfileFollows';

const All = ({ id, sort, identifiable }) => (
  <EmptyMessageOrComponent
    identifiable={identifiable}
    count={identifiable.counts.channels + identifiable.counts.blocks}
  >
    <ProfileContents id={id} sort={sort} />
  </EmptyMessageOrComponent>
);

All.propTypes = {
  id: PropTypes.string.isRequired,
  sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  identifiable: propType(profilePageIdentifiableFragment).isRequired,
};

const Blocks = ({ id, sort, identifiable }) => (
  <EmptyMessageOrComponent
    identifiable={identifiable}
    count={identifiable.counts.blocks}
  >
    <ProfileContents id={id} type="BLOCK" sort={sort} />
  </EmptyMessageOrComponent>
);

Blocks.propTypes = {
  id: PropTypes.string.isRequired,
  sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  identifiable: propType(profilePageIdentifiableFragment).isRequired,
};

const Channels = ({ id, sort, identifiable }) => (
  <EmptyMessageOrComponent
    identifiable={identifiable}
    count={identifiable.counts.channels}
  >
    <ProfileChannels id={id} sort={sort} />
  </EmptyMessageOrComponent>
);

Channels.propTypes = {
  id: PropTypes.string.isRequired,
  sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  identifiable: propType(profilePageIdentifiableFragment).isRequired,
};

const Index = ({ id, filter, identifiable }) => (
  <EmptyMessageOrComponent
    identifiable={identifiable}
    count={identifiable.counts.channels}
  >
    <ProfileChannelIndex id={id} type={filter} />
  </EmptyMessageOrComponent>
);

Index.propTypes = {
  id: PropTypes.string.isRequired,
  filter: PropTypes.oneOf(['OWN', 'COLLABORATION']).isRequired,
  identifiable: propType(profilePageIdentifiableFragment).isRequired,
};

const Followers = ({ id }) => (
  <ProfileFollows id={id} type="followers" />
);

Followers.propTypes = {
  id: PropTypes.string.isRequired,
};

const Following = ({ id }) => (
  <ProfileFollows id={id} type="following" />
);

Following.propTypes = {
  id: PropTypes.string.isRequired,
};

const ProfileViews = ({
  view, id, sort, filter, identifiable,
}) => {
  switch (view) {
    case 'all':
      return <All id={id} sort={sort} identifiable={identifiable} />;
    case 'channels':
      return <Channels id={id} sort={sort} identifiable={identifiable} />;
    case 'blocks':
      return <Blocks id={id} sort={sort} identifiable={identifiable} />;
    case 'index':
      return <Index id={id} filter={filter} identifiable={identifiable} />;
    case 'followers':
      return <Following id={id} />;
    case 'following':
      return <Followers id={id} />;
    default:
      return null;
  }
};

export default ProfileViews;
