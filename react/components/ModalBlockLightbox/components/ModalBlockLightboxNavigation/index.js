import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withApollo } from 'react-apollo';
import Mousetrap from 'mousetrap';

import Link from 'react/components/UI/Link';
import Icons from 'react/components/UI/Icons';

import modalBlockLightboxQuery from 'react/components/ModalBlockLightbox/queries/modalBlockLightbox';

const navigate = xs => ({
  next: cursor =>
    xs[cursor >= xs.length - 1 ? 0 : cursor + 1],
  prev: cursor =>
    xs[cursor <= 0 ? xs.length - 1 : cursor - 1],
});

const Prev = styled(Link).attrs({
  px: 6,
  py: 6,
})`
  position: absolute;
  display: block;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  user-select: none;
  background-color: ${props => props.theme.colors.utility.semiTranslucent};
  z-index: 1;
  transform: rotate(180deg);

  &:hover {
    background-color: white;

    svg {
      fill: black;
    }
  }
`;

const Next = styled(Prev)`
  left: unset;
  right: 0;
  transform: rotate(360deg);
`;

class ModalBlockLightboxNavigation extends PureComponent {
  static propTypes = {
    client: PropTypes.shape({
      query: PropTypes.func.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
    ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    const { ids } = props;
    const { next, prev } = navigate(ids);

    super(props);

    this.__next__ = next;
    this.__prev__ = prev;
  }

  componentDidMount() {
    this.preload('next');

    Mousetrap.bind('right', this.next);
    Mousetrap.bind('left', this.prev);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.preload('next');
    }
  }

  componentWillUnmount() {
    Mousetrap.unbind('right', 'left');
  }

  cursor = () => {
    const { id, ids } = this.props;
    return ids.indexOf(id);
  }

  next = (e) => {
    e.preventDefault();

    const { onChange } = this.props;
    const nextId = this.__next__(this.cursor());

    return onChange(nextId);
  }

  prev = (e) => {
    e.preventDefault();

    const { onChange } = this.props;
    const prevId = this.__prev__(this.cursor());

    return onChange(prevId);
  }


  preload = (direction) => {
    const { client } = this.props;

    const prospectiveId = this[`__${direction}__`](this.cursor());

    client.query({
      query: modalBlockLightboxQuery,
      variables: { id: prospectiveId },
    });
  }

  render() {
    const { id, ids, ...rest } = this.props;

    return (
      <React.Fragment>
        <Prev onClick={this.prev} onMouseOver={() => this.preload('prev')} {...rest}>
          <Icons name="RightCaret" size="1.5rem" color="gray.base" />
        </Prev>

        <Next onClick={this.next} {...rest}>
          <Icons name="RightCaret" size="1.5rem" color="gray.base" />
        </Next>
      </React.Fragment>
    );
  }
}

export default withApollo(ModalBlockLightboxNavigation);
