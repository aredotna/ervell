import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import profilePageIdentifiableFragment from 'react/pages/profile/ProfilePage/fragments/profilePageIdentifiable';

import EmptyMessageOrComponent from 'react/pages/profile/ProfilePage/components/EmptyMessageOrComponent';
import ProfileContents from 'react/components/ProfileContents';

import ProfileChannels from 'react/components/ProfileChannels';
import ProfileChannelIndex from 'react/components/ProfileChannelIndex';
import ProfileFollows from 'react/components/ProfileFollows';
import ProfileGroups from 'react/components/ProfileGroups';

const All = ({
  id, sort, identifiable, fetchPolicy, seed,
}) => (
  <EmptyMessageOrComponent
    identifiable={identifiable}
    count={identifiable.counts.channels + identifiable.counts.blocks}
  >
    <ProfileContents id={id} sort={sort} fetchPolicy={fetchPolicy} seed={seed} />
  </EmptyMessageOrComponent>
);

All.propTypes = {
  id: PropTypes.string.isRequired,
  sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  identifiable: propType(profilePageIdentifiableFragment).isRequired,
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
  seed: PropTypes.number.isRequired,
};

const Blocks = ({
  id, sort, identifiable, fetchPolicy, seed,
}) => (
  <EmptyMessageOrComponent
    identifiable={identifiable}
    count={identifiable.counts.blocks}
  >
    <ProfileContents id={id} type="BLOCK" sort={sort} fetchPolicy={fetchPolicy} seed={seed} />
  </EmptyMessageOrComponent>
);

Blocks.propTypes = {
  id: PropTypes.string.isRequired,
  sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  identifiable: propType(profilePageIdentifiableFragment).isRequired,
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
  seed: PropTypes.number.isRequired,
};

const Channels = ({
  id, sort, identifiable, fetchPolicy, seed,
}) => (
  <EmptyMessageOrComponent
    identifiable={identifiable}
    count={identifiable.counts.channels}
  >
    <ProfileChannels id={id} sort={sort} fetchPolicy={fetchPolicy} seed={seed} />
  </EmptyMessageOrComponent>
);

Channels.propTypes = {
  id: PropTypes.string.isRequired,
  sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  identifiable: propType(profilePageIdentifiableFragment).isRequired,
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
  seed: PropTypes.number.isRequired,
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

const Followers = ({ id, fetchPolicy }) => (
  <ProfileFollows id={id} type="followers" fetchPolicy={fetchPolicy} />
);

Followers.propTypes = {
  id: PropTypes.string.isRequired,
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
};

const Following = ({ id, fetchPolicy }) => (
  <ProfileFollows id={id} type="following" fetchPolicy={fetchPolicy} />
);

Following.propTypes = {
  id: PropTypes.string.isRequired,
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
};

const Groups = ({ id, fetchPolicy }) => (
  <ProfileGroups id={id} fetchPolicy={fetchPolicy} />
);

Groups.propTypes = {
  id: PropTypes.string.isRequired,
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
};

class ProfileViews extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // Once the view changes switch into "network-only" mode
    if (nextProps.view !== prevState.renderedView) {
      return { fetchPolicy: 'network-only' };
    }
    return null;
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
    filter: PropTypes.oneOf(['OWN', 'COLLABORATION']).isRequired,
    identifiable: propType(profilePageIdentifiableFragment).isRequired,
    seed: PropTypes.number.isRequired,
  }

  state = {
    fetchPolicy: 'cache-first',
    // eslint-disable-next-line
    renderedView: this.props.view,
  }

  render() {
    const { fetchPolicy } = this.state;
    const {
      view, id, sort, filter, identifiable, seed,
    } = this.props;

    switch (view) {
      case 'all':
        return (
          <All
            id={id}
            sort={sort}
            identifiable={identifiable}
            fetchPolicy={fetchPolicy}
            seed={seed}
          />
        );
      case 'channels':
        return (
          <Channels
            id={id}
            sort={sort}
            identifiable={identifiable}
            fetchPolicy={fetchPolicy}
            seed={seed}
          />
        );
      case 'blocks':
        return (
          <Blocks
            id={id}
            sort={sort}
            identifiable={identifiable}
            fetchPolicy={fetchPolicy}
            seed={seed}
          />
        );
      case 'index':
        return <Index id={id} filter={filter} identifiable={identifiable} />;
      case 'followers':
        return <Followers id={id} fetchPolicy={fetchPolicy} />;
      case 'following':
        return <Following id={id} fetchPolicy={fetchPolicy} />;
      case 'groups':
        return <Groups id={id} fetchPolicy={fetchPolicy} />;
      default:
        return null;
    }
  }
}

export default ProfileViews;
