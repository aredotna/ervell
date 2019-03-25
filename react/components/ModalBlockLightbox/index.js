import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Mousetrap from 'mousetrap';
import { isEmpty } from 'underscore';
import styled from 'styled-components';

import modalBlockLightboxQuery from 'react/components/ModalBlockLightbox/queries/modalBlockLightbox';

import Box from 'react/components/UI/Box';
import Link from 'react/components/UI/Link';
import Icons from 'react/components/UI/Icons';
import Close from 'react/components/UI/Close';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import BlockLightbox from 'react/components/BlockLightbox';
import ModalBlockLightboxNavigation from 'react/components/ModalBlockLightbox/components/ModalBlockLightboxNavigation';

const Actions = styled(Box)`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Fullscreen = styled(Link)`
  user-select: none;

  &:hover svg {
    fill: black;
  }
`;

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
    layout: 'DEFAULT',
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

    // TODO: Update to /block once before production
    window.history.replaceState(null, null, `/lightbox/${id}`);
  }

  updateId = (id) => {
    this.setState({ id }, () => this.updateUrl());
  }

  toggleLayout = () => {
    this.setState(prevState => ({
      layout: {
        DEFAULT: 'FULLSCREEN',
        FULLSCREEN: 'DEFAULT',
      }[prevState.layout],
    }));
  }

  render() {
    const { id, layout } = this.state;
    const { ids, onClose } = this.props;

    return (
      <Box position="relative" width="100%" height="100%">
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
              <BlockLightbox block={block} context="MODAL" layout={layout}>
                {ids.length > 1 &&
                  <ModalBlockLightboxNavigation
                    id={id}
                    ids={ids}
                    onChange={this.updateId}
                  />
                }
              </BlockLightbox>
            );
          }}
        </Query>

        <Actions>
          <Fullscreen
            px={2}
            py={6}
            onClick={this.toggleLayout}
          >
            <Icons
              size="1.5em"
              name={{ DEFAULT: 'EnterFullscreen', FULLSCREEN: 'ExitFullscreen' }[layout]}
              color="gray.semiBold"
            />
          </Fullscreen>

          <Close
            size={8}
            py={5}
            px={4}
            thickness="2px"
            onClick={onClose}
          />
        </Actions>
      </Box>
    );
  }
}
