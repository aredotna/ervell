import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'react/components/UI/Box';
import Overlay from 'react/components/UI/Overlay';
import PulldownValue from 'react/components/UI/Pulldown/components/PulldownValue';
import PulldownOption from 'react/components/UI/Pulldown/components/PulldownOption';

const Container = styled(Box).attrs({
  width: '88%',
})`
  position: relative;
  background-color: white;
  border-radius: 0.25em;
  border: 1px solid ${x => ({
    resting: x.theme.colors.gray.regular,
    expanded: x.theme.colors.gray.medium,
  }[x.mode])};
  z-index: 1;

  ${x => x.mode === 'expanded' && `
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `}
`;

const PulldownOptions = styled.div`
  box-sizing: border-box;
  border-radius: 0.25em;
  border: 1px solid ${x => x.theme.colors.gray.medium};
  border-top-color: ${x => x.theme.colors.gray.regular};
  margin-left: -1px;
  margin-right: -1px;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

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
    const { options, ...rest } = this.props;

    return (
      <Container mode={mode} {...rest}>
        <PulldownValue
          mode={mode}
          onMouseDown={this.toggle}
          selected
          innerRef={(el) => { this.target = el; }}
        >
          {options[selected]}
        </PulldownValue>

        {mode === 'expanded' &&
          <Overlay targetEl={() => this.target} fullWidth onClose={this.rest}>
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
          </Overlay>
        }
      </Container>
    );
  }
}
