import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Mousetrap from 'mousetrap';
import { isEmpty, debounce } from 'underscore';
import styled from 'styled-components';

import { BREAKPOINTS } from 'react/styles/constants';

import modalBlockLightboxQuery from 'react/components/ModalBlockLightbox/queries/modalBlockLightbox';

import Box from 'react/components/UI/Box';
import Link from 'react/components/UI/Link';
import Icons from 'react/components/UI/Icons';
import Close from 'react/components/UI/Close';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import BlockLightbox from 'react/components/BlockLightbox';
import ModalBlockLightboxNavigation from 'react/components/ModalBlockLightbox/components/ModalBlockLightboxNavigation';

const Fullscreen = styled(Link).attrs({
  border: '1px solid',
})`
  border-radius: ${props => props.theme.radii.subtle};
  user-select: none;

  &:hover {
    border-color: black;
    svg {
      fill: black;
    }
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

    this.debouncedCheckMobileBreakpoint = debounce(this.checkMobileBreakpoint, 250);
    window.addEventListener('resize', this.debouncedCheckMobileBreakpoint);
  }

  componentWillUnmount() {
    Mousetrap.unbind('esc');
    this.restoreUrl();

    window.removeEventListener('resize', this.debouncedCheckMobileBreakpoint);
  }

  checkMobileBreakpoint = () => {
    const { layout } = this.state;

    if (layout === 'FULLSCREEN' && window.innerWidth <= BREAKPOINTS.mobile) {
      this.setState({ layout: 'DEFAULT' });
    }
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

        <Box
          // Hides fullscreen button on mobile
          display={['none', 'block', 'block']}
          position="absolute"
          bottom={0}
          right={0}
          zIndex={1}
          p={7}
        >
          <Fullscreen
            p={4}
            onClick={this.toggleLayout}
            bg={{ DEFAULT: 'white' }[layout]}
            borderColor={{
              DEFAULT: 'gray.semiLight',
              FULLSCREEN: 'gray.semiBold',
            }[layout]}
          >
            <Icons
              size="1rem"
              name={{
                DEFAULT: 'EnterFullscreen',
                FULLSCREEN: 'ExitFullscreen',
              }[layout]}
              color="gray.semiBold"
            />
          </Fullscreen>
        </Box>

        <Close
          size={8}
          py={5}
          px={4}
          thickness="2px"
          onClick={onClose}
          position="absolute"
          top={0}
          right={0}
          zIndex={1}
        />
      </Box>
    );
  }
}
