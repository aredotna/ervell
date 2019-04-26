import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from 'v2/components/UI/Text'

// TODO: Fix. We cannot be hardcoding image URLs.
const addBlockImagePath =
  'https://d2w9rnfcy7mm78.cloudfront.net/2582718/original_fe96a805b0771ca9e44a235c7f9ea3cd.gif'

const IntroduceChannelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 33em;
  padding: 1em 1em 0 1em;
  position: relative;
`

const BodyWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 2em;
`

const Section = styled.div`
  align-self: center;
  marging: 1em 0;
`

const IntroductionText = styled(Text).attrs({
  f: 7,
})`
  text-align: center;
`

class IntroduceChannel extends React.Component {
  constructor(props) {
    super(props)

    this.imageSrc = addBlockImagePath

    this.state = {
      imageLoading: true,
    }
  }

  componentDidMount() {
    this.loadImage()
  }

  loadImage = () => {
    const image = new Image()

    image.onload = () => {
      this.setState({ imageLoading: false })
    }

    image.src = this.imageSrc
  }

  render() {
    if (this.state.imageLoading) return <div />

    return (
      <IntroduceChannelWrapper>
        <BodyWrapper>
          <Section>
            <IntroductionText>Congrats!</IntroductionText>
          </Section>
          <Section>
            <img src={this.imageSrc} draggable="false" alt="" />
          </Section>
          <Section>
            <IntroductionText>
              Get started by adding files, links, or text to your channel.
            </IntroductionText>
          </Section>
        </BodyWrapper>
        <button className="Button Button--divider" onClick={this.props.onClose}>
          Done
        </button>
      </IntroduceChannelWrapper>
    )
  }
}

IntroduceChannel.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default IntroduceChannel
