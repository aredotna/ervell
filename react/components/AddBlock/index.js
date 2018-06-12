import React, { Component } from 'react';
import styled from 'styled-components';
import Styles from 'react/styles';
import { Textarea } from 'react/components/UI/GenericInput';
import { isURL } from 'validator';

const Outline = styled.div`
  width: ${Styles.Constants.blockWidth};
  height: ${Styles.Constants.blockWidth};
  background-color: ${Styles.Colors.gray.semiLight};
  border-radius: .25em;
  padding: 5px;
  box-sizing: border-box;
`;

const Interior = styled.div`
  background: white;
  display: flex;
  height: calc(100% - 0.5em - 2px);
  flex-direction: column;
  padding: 0.5em 0.5em 0;
  border: 1px solid ${Styles.Colors.gray.regular};
  position: relative;
`;

const AddField = styled(Textarea)`
  flex: 3;
  &:focus {
    background: ${Styles.Colors.gray.light};
  }
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 1em;
  font-family: ${Styles.Type.font.sans};
  color: ${Styles.Colors.gray.semiBold};
  line-height: ${Styles.Type.lineHeight.tall};
  display: ${x => (x.mode === 'active' ? 'none' : 'block')};

  a {
    font-weight: bold;
  }
`;

const AddButton = styled.a`
  border-top: 1px solid ${Styles.Colors.gray.regular};
  flex: 1;
  display: flex;
  align-content: center;
  justify-content: center;

  span {
    align-self: center;
    vertical-align: center;
    font-family: ${Styles.Type.font.sans};
    font-weight: bold;
    color: ${x => (x.hasInput ? Styles.Colors.gray.semiBold : Styles.Colors.gray.medium)};
  }
`;

export default class AddBlock extends Component {
  state = {
    input: '',
    blockType: 'block',
    mode: 'resting',
  }

  updateQuery = (input) => {
    this.setState({ input });
  }

  resetQuery = () => {
    this.setState({ input: '' });
  }

  handleFieldChange = ({ target: { value: input } }) => {
    const blockType = isURL(input) ? 'link' : 'block';
    const currentState = { input, blockType };
    this.setState(currentState);
  }

  handlePlaceholderClick = () => {
    this.setState({ mode: 'active' });
    this.textarea.focus();
  }

  handleFieldBlur = () => {
    if (!this.state.input.length) {
      this.setState({ mode: 'resting' });
    }
  }

  render() {
    const {
      input, blockType, mode,
    } = this.state;

    return (
      <Outline>
        <Interior>
          <Placeholder mode={mode} onClick={this.handlePlaceholderClick}>
            <div>Drop some files here</div>
            <div>Add link or some text</div>
            <div>or <a>Upload</a> file</div>
          </Placeholder>
          <AddField
            onChange={this.handleFieldChange}
            onBlur={this.handleFieldBlur}
            innerRef={(textarea) => { this.textarea = textarea; }}
          />
          <AddButton hasInput={input.length} >
            <span>Add {blockType}</span>
          </AddButton>
        </Interior>
      </Outline>
    );
  }
}
