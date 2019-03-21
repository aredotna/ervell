import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Mousetrap from 'mousetrap';
import { isEmpty } from 'underscore';

import modalBlockLightboxQuery from 'react/components/ModalBlockLightbox/queries/modalBlockLightbox';

import Box from 'react/components/UI/Box';
import Close from 'react/components/UI/Close';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import BlockLightbox from 'react/components/BlockLightbox';
import ModalBlockLightboxNavigation from 'react/components/ModalBlockLightbox/components/ModalBlockLightboxNavigation';

export default class ModalBlockLightbox extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    ids: PropTypes.arrayOf(PropTypes.number),
    onClose: PropTypes.func.isRequired,
  }

  static defaultProps = {
    ids: [],
  }

  state = {
    id: this.props.id,
    initial: {},
  }

  componentDidMount() {
    Mousetrap.bind('esc', this.props.onClose);
    this.updateUrl();
  }

  componentWillUnmount() {
    Mousetrap.unbind('esc');
    this.restoreUrl();
  }

  // TODO: Replace all of this with router once we migrate channels
  restoreUrl = () => {
    const { initial } = this.state;
    window.history.replaceState(null, initial.title, initial.href);
  }

  updateUrl = () => {
    const { initial, id } = this.state;

    if (isEmpty(initial)) {
      // Capture initial state
      this.setState({
        initial: {
          href: window.location.href,
          title: document.title,
        },
      });
    }

    window.history.replaceState(null, null, `/block/${id}`);
  }

  updateId = (id) => {
    this.setState({ id }, () => this.updateUrl());
  }

  render() {
    const { id } = this.state;
    const { ids, onClose } = this.props;

    return (
      <Box position="relative" width="100%" height="100%">
        <Close
          position="absolute"
          size={7}
          p={5}
          thickness="4px"
          top="0"
          right="0"
          onClick={onClose}
        />

        <Query query={modalBlockLightboxQuery} variables={{ id }}>
          {({ data, loading, error }) => {
            if (loading) {
              return <LoadingIndicator />;
            }

            if (error) {
              return (
                <ErrorAlert>
                  {error.message}
                </ErrorAlert>
              );
            }

            const { block } = data;

            return (
              <BlockLightbox block={block} context="MODAL">
                {ids.length > 1 &&
                  <ModalBlockLightboxNavigation
                    id={id}
                    ids={ids}
                    position="absolute"
                    top="50%"
                    left="50%"
                    bg="white"
                    zIndex="1"
                    onChange={this.updateId}
                  />
                }
              </BlockLightbox>
            );
          }}
        </Query>
      </Box>
    );
  }
}
