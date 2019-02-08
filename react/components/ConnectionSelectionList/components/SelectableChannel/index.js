import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import selectableChannelFragment from 'react/components/ConnectionSelectionList/components/SelectableChannel/fragments/selectableChannel';

import ColoredChannelSpan from 'react/components/UI/ColoredChannelSpan';
import TickerTapeHover from 'react/components/UI/TickerTapeHover';

import { inputPadding } from 'react/components/UI/Inputs';
import { baseMixin as baseTextMixin } from 'react/components/UI/Text';
import Badge from 'react/components/UI/Badge';

const Container = styled.div.attrs({
  role: 'button',
  tabIndex: 0,
  f: 1,
})`
  ${baseTextMixin}
  position: relative;
  margin-top: -1px;
  line-height: 1;
  user-select: none;
  cursor: pointer;
  color: ${props => props.theme.colors.gray.semiBold};
  border: 1px solid ${props => props.theme.colors.gray.regular};
  background-color: ${props => props.theme.colors.gray.hint};
  white-space: nowrap;
  overflow: hidden;
  text-align: left;

  &:hover {
    z-index: 1;
    border: 1px solid ${props => props.theme.colors.gray.semiBold};
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1em;
    background: linear-gradient(to left, ${props => props.theme.colors.gray.hint}, ${props => props.theme.colors.utility.transparent});
    z-index: 1;
  }

  &:hover,
  &[data-selected="true"] {
    &:before {
      width: 3em;
      background linear-gradient(to left, ${props => props.theme.colors.gray.hint} 60%, ${props => props.theme.colors.utility.transparent})
    }

    &:after {
      content: '✔';
      position: absolute;
      top: 50%;
      right: 0;
      width: 2em;
      text-align: center;
      transform: translateY(-50%);
      z-index: 1;
    }
  }

  &[data-selected="true"] {
    > div {
      opacity: 0.5;
    }
  }
`;

const HoverableInner = styled(TickerTapeHover).attrs({
  speed: 1,
  offsetBuffer: 32,
})`
  padding: ${inputPadding}; // TODO
`;

const Separator = styled.div`
  display: inline-block;
  width: 1px;
  height: 0.75em;
  margin: 0 ${props => props.theme.constantValues.doubleEmptySpaceWidth};
  vertical-align: baseline;
  transform: rotate(30deg);
  background-color: ${props => props.theme.colors.gray.medium};
`;

const GroupBadge = styled(Badge)`
  transform: scale(0.8);
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
    const {
      channel: {
        title, visibility, owner, owner: { name },
      },
    } = this.props;

    return (
      <Container onClick={this.toggleSelection} data-selected={isSelected}>
        <HoverableInner>
          {name}

          {owner.__typename === 'Group' &&
            <GroupBadge ml={2} f={0} color="gray.medium" icon={{ private: 'Lock' }[owner.visibility]}>
              Group
            </GroupBadge>
          }

          <Separator />

          <ColoredChannelSpan visibility={visibility}>
            {title}
          </ColoredChannelSpan>
        </HoverableInner>
      </Container>
    );
  }
}
