import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { fontSize, space } from 'styled-system';

import { preset } from 'react/styles/functions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabList = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  display: flex;
  border-bottom: 1px solid ${x => x.theme.colors.gray.regular};
`;

const TabContent = styled.div`
  display: flex;
  background-color: ${x => x.activeBackgroundColor};
`;

export const activeMixin = css`
  border-top: 2px solid ${x => x.theme.colors.gray.bold};
  border-left: 1px solid ${x => x.theme.colors.gray.regular};
  border-right: 1px solid ${x => x.theme.colors.gray.regular};
  border-bottom: 1px solid ${x => x.activeBackgroundColor};
  color: ${x => x.theme.colors.gray.bold};
  background-color: ${x => x.activeBackgroundColor};
`;

const Label = styled.div`
  text-align: center;
  border: 1px solid transparent;
  border-top: 2px solid transparent;
  cursor: pointer;
  font-family: ${x => x.theme.fonts.sans};
  font-weight: bold;
  margin-bottom: -2px;

  ${preset(space, { pt: 5, pb: 6, px: 9 })};
  ${preset(fontSize, { f: 2 })};

  ${x => x.active && activeMixin};
`;

export default class Tabs extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    activeBackgroundColor: PropTypes.string,
    activeTab: PropTypes.string,
  }

  static defaultProps = {
    activeBackgroundColor: '#fff',
    activeTab: null,
  }

  constructor(props) {
    super(props);

    const { activeTab, children } = props;

    this.state = {
      activeTab: (activeTab || children[0].props.label),
    };
  }

  onTabClick = (tab) => {
    this.setState({ activeTab: tab });
  }

  render() {
    const { props: { children, activeBackgroundColor }, state: { activeTab } } = this;

    return (
      <Container>
        <TabList>
          {children.map((child) => {
            const { label } = child.props;
            const active = activeTab === label;

            return (
              <Label
                activeBackgroundColor={activeBackgroundColor}
                active={active}
                key={label}
                onClick={() => this.onTabClick(label)}
              >
                {label}
              </Label>
            );
          })}
        </TabList>
        <TabContent activeBackgroundColor={activeBackgroundColor}>
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child;
          })}
        </TabContent>
      </Container>
    );
  }
}
