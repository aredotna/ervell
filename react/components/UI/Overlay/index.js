import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';
import { position, top, right, bottom, left } from 'styled-system';

import { preset } from 'react/styles/functions';

import compactObject from 'react/util/compactObject';

const Wrapper = styled.div`
  ${preset(position, { position: 'absolute' })}
  ${top}
  ${right}
  ${bottom}
  ${left}
`;

export default class Overlay extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    targetEl: PropTypes.func.isRequired,
    alignToY: PropTypes.oneOf(['top', 'bottom']),
    alignToX: PropTypes.oneOf(['left', 'right']),
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
  }

  static defaultProps = {
    alignToY: 'bottom',
    alignToX: 'left',
    offsetX: 0,
    offsetY: 0,
  }

  constructor(props) {
    super(props);

    this.el = document.createElement('div');
  }

  state = {
    top: null,
    right: null,
    bottom: null,
    left: null,
  }

  componentDidMount() {
    document.body.appendChild(this.el);

    this.alignToEl(this.props.targetEl());
  }

  componentWillUnmount() {
    this.el.parentNode.removeChild(this.el);
  }

  alignToEl = (el) => {
    const {
      alignToY, alignToX, offsetY, offsetX,
    } = this.props;

    const { [alignToY]: y, [alignToX]: x } = el.getBoundingClientRect();

    this.setState({
      top: y + offsetY,
      left: x + offsetX,
    });
  }

  render() {
    const { children, onClose, ...rest } = this.props;

    return ReactDOM.createPortal(
      (
        <Wrapper {...compactObject(this.state)} {...rest}>
          <OutsideClickHandler onOutsideClick={onClose}>
            {children}
          </OutsideClickHandler>
        </Wrapper>
      ), this.el,
    );
  }
}
