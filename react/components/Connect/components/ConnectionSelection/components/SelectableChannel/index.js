import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import selectableChannelFragment from 'react/components/Connect/components/ConnectionSelection/components/SelectableChannel/fragments/selectableChannel';

import ColoredChannelSpan from 'react/components/UI/ColoredChannelSpan';

import Styles from 'react/styles';
import { inputPadding } from 'react/components/UI/GenericInput';

const Container = styled.div.attrs({
  role: 'button',
  tabIndex: 0,
})`
  position: relative;
  margin-top: -1px;
  padding: ${inputPadding};
  line-height: 1;
  user-select: none;
  cursor: pointer;
  color: ${Styles.Colors.gray.semiBold};
  border: 1px solid ${Styles.Colors.gray.regular};
  background-color: ${Styles.Colors.gray.hint};
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    z-index: 1;
    border: 1px solid ${Styles.Colors.gray.semiBold};
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1em;
    background: linear-gradient(to left, ${Styles.Colors.gray.hint}, ${Styles.Colors.utility.transparent});
  }

  &:hover,
  &[data-selected="true"] {
    &:before {
      width: 3em;
      background linear-gradient(to left, ${Styles.Colors.gray.hint} 60%, ${Styles.Colors.utility.transparent})
    }

    &:after {
      content: '✔';
      position: absolute;
      top: 50%;
      right: 0;
      width: 2em;
      text-align: center;
      transform: translateY(-50%);
    }
  }
`;

const Separator = styled.div`
  display: inline-block;
  width: 1px;
  height: 0.75em;
  margin: 0 0.75em;
  vertical-align: baseline;
  transform: rotate(30deg);
  background-color: ${Styles.Colors.gray.medium};
`;

export default class SelectableChannel extends Component {
  static propTypes = {
    channel: propType(selectableChannelFragment).isRequired,
    onSelection: PropTypes.func,
  }

  static defaultProps = {
    onSelection: () => {},
  }

  state = {
    isSelected: false,
  }

  toggleSelection = () => {
    const { onSelection, channel } = this.props;

    this.setState(({ isSelected }) => {
      onSelection(!isSelected, channel.id);

      return { isSelected: !isSelected };
    });
  }

  render() {
    const { isSelected } = this.state;
    const { channel: { title, visibility, user: { name } } } = this.props;

    return (
      <Container onClick={this.toggleSelection} data-selected={isSelected}>
        {name}

        <Separator />

        <ColoredChannelSpan visibility={visibility}>
          {title}
        </ColoredChannelSpan>
      </Container>
    );
  }
}
