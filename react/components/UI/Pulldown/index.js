import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, alignSelf, width } from 'styled-system';
import OutsideClickHandler from 'react-outside-click-handler';

import { preset } from 'react/styles/functions';

import PulldownOption from 'react/components/UI/Pulldown/components/PulldownOption';

const Container = styled.div`
  position: relative;
  background-color: white;
  border: 1px solid ${x => x.theme.colors.gray.regular};
  border-radius: 0.25em;
  overflow: hidden;
  ${space}
  ${alignSelf}
  ${preset(width, { width: '88%' })}

  ${x => x.mode === 'expanded' && `
    overflow: visible;
  `}

  ${x => x.mode === 'resting' && `
    // Down-pointing caret
    &:after {
      display: block;
      content: '';
      position: absolute;
      top: 50%;
      right: 1em;
      width: 0;
      height: 0;
      transform: translateY(-50%);
      border-top: 0.66em solid ${x.theme.colors.gray.semiBold};
      border-right: 0.33em solid transparent;
      border-left: 0.33em solid transparent;
    }
  `}
`;

const PulldownOptions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  border-radius: 0.125em;
  background-color: white;
  box-shadow: 0 0 0 1px ${x => x.theme.colors.gray.medium};
  overflow: hidden;
`;

export default class Pulldown extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number, PropTypes.bool,
    ]).isRequired,
    onChange: PropTypes.func,
    options: PropTypes.objectOf(PropTypes.node).isRequired,
  }

  static defaultProps = {
    onChange: () => {},
  }

  constructor(props) {
    super(props);

    const { value } = this.props;

    this.state = {
      mode: 'resting',
      value,
    };
  }

  expand = () =>
    this.setState({ mode: 'expanded' });

  rest = () =>
    this.setState({ mode: 'resting' });

  selectValue = value => () => {
    const { onChange } = this.props;

    this.setState({
      mode: 'resting',
      value,
    });

    return onChange(value);
  }

  sortedKeys = () => {
    const { value: selected } = this.state;
    const { options } = this.props;

    const keys = Object.keys(options);

    keys.splice(keys.indexOf(selected), 1);

    return [selected, ...keys];
  }

  render() {
    const { value: selected, mode } = this.state;
    const { options } = this.props;

    return (
      <OutsideClickHandler onOutsideClick={this.rest}>
        <Container mode={mode}>
          <PulldownOption
            mode="resting"
            onClick={this.expand}
          >
            {options[selected]}
          </PulldownOption>

          {mode === 'expanded' &&
            <PulldownOptions>
              {this.sortedKeys().map(key => (
                <PulldownOption
                  key={key}
                  mode="expanded"
                  onClick={this.selectValue(key)}
                >
                  {options[key]}
                </PulldownOption>
              ))}
            </PulldownOptions>
          }
        </Container>
      </OutsideClickHandler>
    );
  }
}
