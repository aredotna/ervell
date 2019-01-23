import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ExploreContents from 'react/components/ExploreContents';

const All = ({
  sort, fetchPolicy, seed,
}) => (
  <ExploreContents type="ALL" sort={sort} fetchPolicy={fetchPolicy} seed={seed} />
);

All.propTypes = {
  sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
  seed: PropTypes.number.isRequired,
};

const Blocks = ({
  sort, fetchPolicy, seed,
}) => (
  <ExploreContents type="CONNECTABLE" sort={sort} fetchPolicy={fetchPolicy} seed={seed} />
);

Blocks.propTypes = {
  sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
  seed: PropTypes.number.isRequired,
};

const Channels = ({
  sort, fetchPolicy, seed,
}) => (
  <ExploreContents type="CHANNEL" sort={sort} fetchPolicy={fetchPolicy} seed={seed} />
);

Channels.propTypes = {
  sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
  seed: PropTypes.number.isRequired,
};

class ExploreViews extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // Once the view changes switch into "network-only" mode
    if (nextProps.view !== prevState.renderedView) {
      return { fetchPolicy: 'network-only' };
    }
    return null;
  }

  static propTypes = {
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
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
      view, sort, seed,
    } = this.props;

    switch (view) {
      case 'all':
        return (
          <All
            sort={sort}
            fetchPolicy={fetchPolicy}
            seed={seed}
          />
        );
      case 'channels':
        return (
          <Channels
            sort={sort}
            fetchPolicy={fetchPolicy}
            seed={seed}
          />
        );
      case 'blocks':
        return (
          <Blocks
            sort={sort}
            fetchPolicy={fetchPolicy}
            seed={seed}
          />
        );
      default:
        return null;
    }
  }
}

export default ExploreViews;
