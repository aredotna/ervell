import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';
import { position, top, right, bottom, left, width, height } from 'styled-system';
import { debounce } from 'underscore';

import { preset } from 'react/styles/functions';

import compactObject from 'react/util/compactObject';

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${x => x.theme.z.modal};
  pointer-events: none;
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  ${preset(position, { position: 'absolute' })}
  ${top}
  ${right}
  ${bottom}
  ${left}
  ${width}
  ${height}
  pointer-events: all;
`;

export default class Overlay extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    targetEl: PropTypes.func.isRequired,
    anchorY: PropTypes.oneOf(['top', 'bottom']),
    anchorX: PropTypes.oneOf(['left', 'right']),
    alignToY: PropTypes.oneOf(['top', 'bottom']),
    alignToX: PropTypes.oneOf(['left', 'right']),
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
    fullWidth: PropTypes.bool,
  }

  static defaultProps = {
    anchorY: 'top',
    anchorX: 'left',
    alignToY: 'bottom',
    alignToX: 'left',
    offsetX: 0,
    offsetY: 0,
    fullWidth: false,
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
    width: null,
    height: null,
  }

  componentDidMount() {
    document.body.appendChild(this.el);

    this.positionOverlay = () => this.alignToEl(this.props.targetEl());
    this.debouncedPositionOverlay = debounce(this.positionOverlay, 100);

    window.addEventListener('resize', this.debouncedPositionOverlay);
    document.body.addEventListener('mousewheel', this.debouncedPositionOverlay);

    this.positionOverlay();

    // Re-position the overlay if anything in the subtree changes
    this.observer = new MutationObserver(this.positionOverlay);
    this.observer.observe(this.wrapper, { childList: true, subtree: true });
  }

  componentWillUnmount() {
    this.el.parentNode.removeChild(this.el);

    window.removeEventListener('resize', this.debouncedPositionOverlay);
    document.body.removeEventListener('mousewheel', this.debouncedPositionOverlay);

    this.observer.disconnect();
  }

  alignToEl = (el) => {
    const {
      anchorY, anchorX, alignToY, alignToX, offsetY, offsetX, fullWidth,
    } = this.props;

    const { [alignToY]: y, [alignToX]: x, width: elWidth } = el.getBoundingClientRect();

    const positions = {
      top: y,
      bottom: window.innerHeight - y,
      left: x,
      right: window.innerWidth - x,
    };

    const positionState = {
      [anchorY]: positions[anchorY] + offsetY,
      [anchorX]: positions[anchorX] + offsetX,
    };

    if (fullWidth) {
      positionState.width = elWidth;
    }

    // Moves into position
    this.setState(positionState, () => {
      // Then handle overflowing calculations
      const {
        bottom: bottomEdge,
        top: topEdge,
        height: wrapperHeight,
      } = this.wrapper.getBoundingClientRect();

      const isOverflowingViewportTop = anchorY === 'bottom' && topEdge <= 0;
      const isOverflowingViewportBottom = anchorY === 'top' && bottomEdge >= window.innerHeight;

      if (isOverflowingViewportTop) {
        return this.setState({ height: wrapperHeight + topEdge, topEdge });
      }

      if (isOverflowingViewportBottom) {
        const bottomDifference = window.innerHeight - bottomEdge;
        return this.setState({ height: wrapperHeight + bottomDifference });
      }

      if (this.state.height) {
        return this.setState({ height: null });
      }

      return null;
    });
  }

  render() {
    const { children, onClose, ...rest } = this.props;

    return ReactDOM.createPortal(
      (
        <Background>
          <OutsideClickHandler onOutsideClick={onClose}>
            <Wrapper
              {...compactObject(this.state)}
              {...rest}
              innerRef={(el) => { this.wrapper = el; }}
            >
              {children}
            </Wrapper>
          </OutsideClickHandler>
        </Background>
      ), this.el,
    );
  }
}
