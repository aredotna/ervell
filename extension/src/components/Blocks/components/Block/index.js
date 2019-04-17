import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Truncate from 'react/components/UI/Truncate';
import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

const Container = styled(Box)`
  display: flex;

  ${props => props.isText && `
    flex: 0 0 100%;
  `}
`;

const TextContainer = styled(Box).attrs({
  my: 3,
})`
  min-width: 100%;
  text-align: left;
  display: flex;
  position: relative;
  height: 3.75rem;
  overflow-y: hidden;
  
  &:after {
    content: '';
    background: linear-gradient(${x => x.theme.colors.utility.transparent} 0%, white 75%);
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

const ImageContainer = styled(Box).attrs({
  m: 5,
})`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100px;
  height: 100px;
  background-image: url(${props => props.src});
`;

class Block extends PureComponent {
  static propTypes = {
    block: PropTypes.node.isRequired,
  }

  render() {
    const { block } = this.props;
    const isText = block.type === 'Text' || block.type === 'Link';

    return (
      <Container isText={isText}>
        {isText &&
          <TextContainer>
            <Text font="serif">
              <Truncate suffix="..." length={220}>
                {block.value}
              </Truncate>
            </Text>
          </TextContainer>
        }
        {block.type === 'Image' &&
          <ImageContainer src={block.value} />
        }
      </Container>
    );
  }
}

export default Block;
