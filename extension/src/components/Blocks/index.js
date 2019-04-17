import React, { Component } from 'react';
import styled from 'styled-components';

import Messenger from 'extension/src/lib/Messenger';
import { ExtensionContext } from 'extension/src/components/Extension';

import Text from 'react/components/UI/Text';
import Box from 'react/components/UI/Box';

import Block from 'extension/src/components/Blocks/components/Block';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  position: relative;
  width: 100%;
`;

const Top = styled(Box).attrs({ my: 10 })`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DropZone = styled(Box).attrs({ p: 7 })`
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
      <ExtensionContext.Consumer>
        {({ blocks }) => (
          <Container>
            <Top>
              <DropZone>
                <Text f={5}>Drop here to add to Are.na</Text>
              </DropZone>
            </Top>

            <BlocksContainer>
              {blocks.map(block => (
                <Block block={block} key={block.id} />
              ))}
            </BlocksContainer>
          </Container>
        )}
      </ExtensionContext.Consumer>
    );
  }
}

export default Blocks;
