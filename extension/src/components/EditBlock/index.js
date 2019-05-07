/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import withExtensionContext from 'extension/src/components/Extension/withExtension'
import Text from 'src/v2/components/UI/Text'
import Box from 'src/v2/components/UI/Box'
import { Input, Textarea } from 'src/v2/components/UI/Inputs'
import { GenericButton as Button } from 'src/v2/components/UI/GenericButton'

const Container = styled(Box).attrs({ p: 6, pt: 9 })`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  border: 1px solid ${props => props.theme.colors.gray.regular};
`

const Top = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  top: ${props => props.theme.space[5]};
  left: ${props => props.theme.space[5]};
  right: ${props => props.theme.space[5]};
  z-index: 100;
`

const Bottom = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  width: 100%;
`

const Back = styled(Text).attrs({
  f: 3,
  color: 'gray.regular',
})`
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.gray.bold};
  }

  &:after {
    content: 'back';
  }
`

const Image = styled(Box).attrs({
  my: 4,
  mx: 'auto',
})`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  width: 150px;
  height: 150px;
  background-image: url(${props => props.src});
  border: 1px solid ${props => props.theme.colors.gray.light};
`

const ContentsTextarea = styled(Textarea)`
  font-size: ${props => props.theme.fontSizesIndexed.md};
  font-family: ${props => props.theme.fonts.serif};
  line-height: ${props => props.theme.lineHeightsIndexed.tall};
`

const Cancel = styled(Text).attrs({
  f: 2,
  underlineLinks: true,
  color: 'gray.medium',
})`
  cursor: pointer;
  text-align: center;
  a:hover {
    color: ${props => props.theme.colors.gray.bold};
  }
`

class EditBlock extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      value: this.getCurrentBlock().value,
      title: this.getCurrentBlock().title,
      description: this.getCurrentBlock().description,
    }
  }

  onBack = () => {
    this.props.history.goBack()
  }

  onSave = e => {
    e.preventDefault()

    const {
      context: { editBlock },
    } = this.props
    const { value, title, description } = this.state

    editBlock(this.getCurrentBlock().id, { value, title, description })
    this.onBack()
  }

  getCurrentBlock = () => {
    const {
      match,
      context: { getBlock },
    } = this.props
    const { id } = match.params
    const block = getBlock(id)
    return block
  }

  handleInput = fieldName => ({ target: { value: fieldValue } }) => {
    this.setState({ [fieldName]: fieldValue })
  }

  handleTitle = this.handleInput('title')
  handleContents = this.handleInput('value')
  handleDescription = this.handleInput('description')

  render() {
    const block = this.getCurrentBlock()
    const { value, title, description } = this.state

    return (
      <form onSubmit={this.onSave}>
        <Container>
          <Top>
            <Back onClick={this.onBack} />
          </Top>

          <Box
            justifyContent="center"
            alignItems="stretch"
            display="flex"
            flexDirection="column"
            width="100%"
          >
            {block.type === 'Image' && <Image src={block.value} />}

            {block.type === 'Text' && (
              <ContentsTextarea
                mb={6}
                placeholder="Contents"
                rows={7}
                value={value}
                onChange={this.handleContents}
              />
            )}
            <Box
              justifyContent="center"
              alignItems="stretch"
              display="flex"
              flexDirection="column"
            >
              <Text f={1} fontWeight="bold" mb={3}>
                Title
              </Text>
              <Input
                mb={7}
                placeholder="Title"
                tabIndex={0}
                value={title}
                onChange={this.handleTitle}
                autoFocus
              />

              <Text f={1} fontWeight="bold" mb={3}>
                Description
              </Text>
              <Textarea
                mb={6}
                placeholder="Description"
                rows={4}
                value={description}
                onChange={this.handleDescription}
              />
            </Box>
          </Box>

          <Bottom>
            <Button type="submit" f={4} mb={4}>
              Save
            </Button>
            <Cancel>
              <a onClick={this.onBack} role="link" tabIndex={0}>
                Cancel
              </a>
            </Cancel>
          </Bottom>
        </Container>
      </form>
    )
  }
}

export default withExtensionContext(withRouter(EditBlock))
