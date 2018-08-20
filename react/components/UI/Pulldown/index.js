import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, alignSelf } from 'styled-system';
import OutsideClickHandler from 'react-outside-click-handler';

import PulldownOption from 'react/components/UI/Pulldown/components/PulldownOption';

const Container = styled.div`
  position: relative;
  background-color: white;
  border: 1px solid ${x => x.theme.colors.gray.regular};
  border-radius: 0.25em;
  overflow: hidden;
  ${space}
  ${alignSelf}

  ${x => x.mode === 'expanded' && `
    overflow: visible;
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
    // TODO: Value propTypes
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    options: PropTypes.objectOf(PropTypes.node).isRequired,
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

  selectValue = value => () =>
    this.setState({
      mode: 'resting',
      value,
    });

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
