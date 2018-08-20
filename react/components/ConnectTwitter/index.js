import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { map } from 'underscore';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

import connectTwitterQuery from 'react/components/ConnectTwitter/queries/index';
import TitledDialog from 'react/components/UI/TitledDialog';
import Contact from 'react/components/ConnectTwitter/components/Contact/index';

class ConnectTwitter extends Component {
  static propTypes = {
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
    const { onClose } = this.props;

    return (
      <TitledDialog
        title="Find friends"
        label={{
          resting: 'Done',
        }[mode]}
        onDone={onClose}
      >
        <Query
          query={connectTwitterQuery}
          variables={{
            page: 1,
            per: 25,
          }}
        >
          {({
            loading, error, data, fetchMore,
          }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            const { me: { authenticated_service: { contacts } } } = data;

            return (
              <InfiniteScroll
                pageStart={1}
                loadMore={() => {
                  fetchMore({
                    variables: {
                      page: 2,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        me: [
                          ...prev.me.authenticated_service.contacts,
                          ...fetchMoreResult.me.authenticated_service.contacts,
                        ],
                      });
                    },
                  });
                }}
                hasMore
                loader={<div className="loader" key={0}>Loading ...</div>}
                useWindow
              >
                {map(contacts, user => <Contact user={user} key={user.id} />)}
              </InfiniteScroll>
            );
          }}
        </Query>
      </TitledDialog>
    );
  }
}

export default ConnectTwitter;
