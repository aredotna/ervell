import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, alignSelf, width } from 'styled-system';
import OutsideClickHandler from 'react-outside-click-handler';

import { preset } from 'react/styles/functions';

import PulldownValue from 'react/components/UI/Pulldown/components/PulldownValue';
import PulldownOption from 'react/components/UI/Pulldown/components/PulldownOption';

const Container = styled.div`
  position: relative;
  background-color: white;
  border: 1px solid ${x => ({
    resting: x.theme.colors.gray.regular,
    expanded: x.theme.colors.gray.medium,
  }[x.mode])};
  border-radius: 0.25em;
  overflow: hidden;
  ${space}
  ${alignSelf}
  ${preset(width, { width: '88%' })}

  ${x => x.mode === 'expanded' && `
    overflow: visible;
    z-index: 1;
  `}
`;

const PulldownOptions = styled.div`
  border-radius: 0.125em;
  background-color: white;
  border-top: 1px solid ${x => x.theme.colors.gray.light};
  overflow: hidden;

  ${x => x.mode === 'expanded' && `
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  `}
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

  toggle = () => {
    this.setState(prevState => ({
      mode: prevState.mode === 'resting' ? 'expanded' : 'resting',
    }));
  }

  selectValue = value => () => {
    this.setState({ mode: 'resting', value });
    return this.props.onChange(value);
  }

  render() {
    const { value: selected, mode } = this.state;
    const { options } = this.props;

    return (
      <Container mode={mode}>
        <OutsideClickHandler onOutsideClick={this.rest}>
          <PulldownValue mode={mode} onClick={this.toggle} selected>
            {options[selected]}
          </PulldownValue>

          {mode === 'expanded' &&
            <PulldownOptions mode={mode}>
              {Object.keys(options).map(key => (
                <PulldownOption
                  key={key}
                  mode={mode}
                  selected={key === selected}
                  onClick={this.selectValue(key)}
                >
                  {options[key]}
                </PulldownOption>
              ))}
            </PulldownOptions>
          }
        </OutsideClickHandler>
      </Container>
    );
  }
}
