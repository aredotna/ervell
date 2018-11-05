import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tab from 'react/components/UI/Tabs/components/Tab';

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
  background: linear-gradient(${x => x.theme.colors.gray.extraLight}, white);
`;

export default class Tabs extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    activeTab: PropTypes.string,
  }

  static defaultProps = {
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
    const { children } = this.props;
    const { activeTab } = this.state;
    const labels = children.map(child => (child.props.label));
    const content = children.find(child => child.props.label === activeTab);

    return (
      <Container>
        <TabList>
          {labels.map(label => (
            <Tab
              active={activeTab === label}
              key={label}
              onTabClick={this.onTabClick}
              label={label}
            />
          ))}
        </TabList>
        <TabContent>
          {content}
        </TabContent>
      </Container>
    );
  }
}
