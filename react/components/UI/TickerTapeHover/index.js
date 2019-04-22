import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TickerTapeHover extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    speed: PropTypes.number,
    offsetBuffer: PropTypes.number,
  }

  static defaultProps = {
    speed: 1,
    offsetBuffer: 0,
  }

  constructor(props) {
    super(props);

    this.isRunning = true;
    this.currentOffset = 0;
    this.offsetLimit = 0;
  }

  componentDidMount() {
    this.offsetLimit = this.el.scrollWidth - this.el.clientWidth;
  }

  handleMouseEnter = () => {
    const { speed, offsetBuffer } = this.props;

    if (this.offsetLimit === 0) return;

    const tick = () => {
      if (!this.isRunning) return;
      if (this.currentOffset >= this.offsetLimit + offsetBuffer) return;

      this.currentOffset += speed;

      if (this.el) {
        this.el.style.transform = `translateX(-${this.currentOffset}px)`;
      }

      window.requestAnimationFrame(tick);
    };

    this.isRunning = true;
    tick();
  }

  handleMouseLeave = () => {
    this.isRunning = false;
    this.currentOffset = 0;
    this.el.style.transform = `translateX(${this.currentOffset}px)`;
  }

  render() {
    const {
      children,
      offsetBuffer: _offsetBuffer,
      speed: _speed,
      ...rest
    } = this.props;

    return (
      <div
        ref={(el) => { this.el = el; }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...rest}
      >
        {children}
      </div>
    );
  }
}
