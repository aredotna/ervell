import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { map } from 'underscore';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

import connectTwitterQuery from 'react/components/ConnectTwitter/queries/index';
import TitledDialog from 'react/components/UI/TitledDialog';
import Contact from 'react/components/ConnectTwitter/components/Contact/index';

const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    me: {
      ...previousResult.me,
      authenticated_service: {
        ...previousResult.me.authenticated_service,
        contacts: [
          ...previousResult.me.authenticated_service.contacts,
          ...fetchMoreResult.me.authenticated_service.contacts,
        ],
      },
    },
  };
};

class ConnectTwitter extends Component {
  static propTypes = {
    onClose: PropTypes.func,
  }

  static defaultProps = {
    onClose: () => false,
  }

  state = {
    mode: 'resting',
    page: 1,
    hasMore: true,
  }

  afterFetchMore = (fetchMoreResult) => {
    const { data, errors } = fetchMoreResult;
    const hasMore = (
      !errors &&
      data.me.authenticated_service.contacts.length > 0
    );
    this.setState({
      page: this.state.page + 1,
      hasMore,
    });
  }

  render() {
    const { mode, page, hasMore } = this.state;
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
            per: 30,
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
                      page: (page + 1),
                    },
                    updateQuery,
                  }).then(this.afterFetchMore);
                }}
                hasMore={hasMore}
                useWindow={false}
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
