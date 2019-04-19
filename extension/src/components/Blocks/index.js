import React, { Component } from 'react';
import styled from 'styled-components';

import Layout from 'extension/src/components/Layout';
import Messenger from 'extension/src/lib/Messenger';
import { ExtensionContext } from 'extension/src/components/Extension';

import Text from 'react/components/UI/Text';
import Box from 'react/components/UI/Box';
import { GenericButtonLink as Button } from 'react/components/UI/GenericButton';
import Count from 'react/components/UI/Count';

import Block from 'extension/src/components/Blocks/components/Block';
import SelectedChannel from 'extension/src/components/Blocks/components/SelectedChannel';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  position: relative;
  width: 100%;
`;

const Top = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const DropZone = styled(Box).attrs({ p: 7, mt: 10, mb: 9 })`
  border: 2px dashed ${x => x.theme.colors.gray.semiLight};
`;

const BlocksContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
`;

const Bottom = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  width: 100%;
`;

class Blocks extends Component {
  constructor(props) {
    super(props);
    this.messenger = new Messenger(window.top);
  }

  componentDidMount() {
    this.messenger.send({
      action: 'expand',
    });
  }

  render() {
    return (
      <Layout>
        <ExtensionContext.Consumer>
          {({ blocks, removeBlock }) => (
            <Container>
              <Top>
                <DropZone>
                  <Text f={5}>Drop here to add to Are.na</Text>
                </DropZone>
                <BlocksContainer>
                  {blocks.map(block => (
                    <Block block={block} key={block.id} removeBlock={removeBlock} />
                  ))}
                </BlocksContainer>
              </Top>

              <Bottom>
                <SelectedChannel />

                {blocks.length > 0 &&
                  <Button f={4} my={4}>
                    Connect&nbsp;<Count label="block" amount={blocks.length} />&nbsp;→
                  </Button>
                }
              </Bottom>
            </Container>
          )}
        </ExtensionContext.Consumer>
      </Layout>
    );
  }
}

export default Blocks;
