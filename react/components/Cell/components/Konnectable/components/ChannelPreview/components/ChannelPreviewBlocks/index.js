import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import preloadImages from 'react/util/preloadImages';

import channelPreviewBlockFragment from 'react/components/Cell/components/Konnectable/components/ChannelPreview/components/ChannelPreviewBlocks/fragments/channelPreviewBlock';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
  width: ${props => props.theme.constantValues.blockPreviewWidth};
  height: ${props => props.theme.constantValues.blockPreviewWidth};

  &:hover {
    opacity: 0.1;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.gray.hint};
`;

const Snippet = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  align-self: flex-start;

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    height: 3em;
    width: 100%;
    background: linear-gradient(${props => props.theme.colors.utility.transparent} 0%,
      white 50%);
  }
`;

export default class ChannelPreviewBlocks extends PureComponent {
  static propTypes = {
    blocks: PropTypes.arrayOf(propType(channelPreviewBlockFragment)).isRequired,
    speed: PropTypes.number,
    LoadingIndicator: PropTypes.func.isRequired,
  }

  static defaultProps = {
    speed: 500,
  }

  state = {
    mode: 'loading',
    cursor: 0,
  }

  componentDidMount() {
    const { blocks } = this.props;

    const imageUrls = blocks.map(({ preview_image_url }) =>
      preview_image_url).filter(Boolean);

    preloadImages(imageUrls)
      .then(() =>
        this.setState({ mode: 'ready' }, () => this.play()))
      .catch(() =>
        this.setState({ mode: 'ready' }, () => this.play()));
  }


  componentWillUnmount() {
    this.stop();
  }

  play() {
    const { speed } = this.props;

    this.interval = setInterval(() => {
      this.setState(prevState => ({ cursor: prevState.cursor + 1 }));
    }, speed);
  }

  stop() {
    clearInterval(this.interval);
  }

  render() {
    const { cursor, mode } = this.state;
    const { blocks, LoadingIndicator, ...rest } = this.props;

    const block = blocks[cursor % blocks.length];

    if (mode === 'loading') {
      return <LoadingIndicator />;
    }

    const Inner = {
      Text: () => (
        <Snippet>
          <Text
            f={4}
            font="serif"
            textAlign="left"
            dangerouslySetInnerHTML={{ __html: block.preview_content }}
          />
        </Snippet>
      ),
      Image: () => (
        <Img src={block.preview_image_url} alt="Preview" />
      ),
      Link: () => (
        <Img src={block.preview_image_url} alt="Preview" />
      ),
      Embed: () => (
        <Img src={block.preview_image_url} alt="Preview" />
      ),
      Attachment: () => (
        <React.Fragment>
          {block.preview_image_url
            ? <Img src={block.preview_image_url} alt="Preview" />
            : (
              <Box bg="gray.light" width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
                <Text font="narrow" color="gray.medium" fontWeight="bold" f={8} textTransform="uppercase">
                  {block.file_extension}
                </Text>
              </Box>
            )
          }
        </React.Fragment>
      ),
    }[block.__typename];

    return (
      <Container {...rest}>
        <Inner block={block} />
      </Container>
    );
  }
}
