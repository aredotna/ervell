import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { graphql } from 'react-apollo';

import mapErrors from 'react/util/mapErrors';
import compactObject from 'react/util/compactObject';

import manageBlockFragment from 'react/components/ManageBlock/fragments/manageBlock';
import updateBlockMutation from 'react/components/ManageBlock/mutations/updateBlock';

import Box from 'react/components/UI/Box';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import TitledDialog from 'react/components/UI/TitledDialog';
import { Input, Textarea, Label, LabelledInput } from 'react/components/UI/Inputs';

class ManageBlock extends PureComponent {
  static propTypes = {
    block: propType(manageBlockFragment).isRequired,
    updateBlock: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
    onChangePending: PropTypes.func,
    autoFocus: PropTypes.oneOf(['title', 'description', 'body']),
  }

  static defaultProps = {
    onChangePending: () => {},
    autoFocus: 'title',
  }

  state = {
    mode: 'resting',
    title: null,
    description: null,
    content: null,
    errorMessage: null,
  }

  componentDidMount() {
    const { autoFocus } = this.props;

    setTimeout(() => {
      const element = {
        title: this.titleRef,
        description: this.descriptionRef,
        body: this.bodyRef,
      }[autoFocus];

      element.current.focus();
    }, 0);
  }

  titleRef = React.createRef()
  descriptionRef = React.createRef()
  bodyRef = React.createRef()

  handleErrors = (err) => {
    this.setState({
      mode: 'error',
      ...mapErrors(err),
    });
  }

  updateBlock = (e) => {
    e.preventDefault();

    const {
      block, updateBlock, onDone, onChangePending,
    } = this.props;
    const { title, description, content } = this.state;

    const variables = compactObject({
      id: block.id,
      title,
      description,
      content,
    });

    this.setState({ mode: 'updating' });

    return updateBlock({ variables })
      .then(() => {
        onChangePending(false);
        return onDone();
      })
      .catch(this.handleErrors);
  }

  handleInput = fieldName => ({ target: { value: fieldValue } }) => {
    const { onChangePending } = this.props;

    onChangePending(true);

    this.setState({ [fieldName]: fieldValue });
  }

  handleTitle = this.handleInput('title')
  handleDescription = this.handleInput('description')
  handleContent = this.handleInput('content')

  render() {
    const { mode, errorMessage } = this.state;
    const { block } = this.props;

    return (
      <TitledDialog
        title="Update block"
        onDone={this.updateBlock}
        disabled={mode === 'updating'}
        label={{
          resting: 'Save',
          updating: 'Updating...',
          error: 'Error',
        }[mode]}
      >
        <Box>
          {mode === 'error' &&
            <ErrorAlert my={6} isReloadable={false}>
              {errorMessage}
            </ErrorAlert>
          }

          <LabelledInput>
            <Label>Title</Label>

            <Input
              placeholder="Title your block here"
              defaultValue={block.editable_title}
              onChange={this.handleTitle}
              ref={this.titleRef}
            />
          </LabelledInput>

          <LabelledInput>
            <Label>Info</Label>

            <Textarea
              placeholder="Describe your block here"
              defaultValue={block.editable_description}
              onChange={this.handleDescription}
              rows={block.__typename !== 'Text' ? 12 : 4}
              f={3}
              ref={this.descriptionRef}
            />
          </LabelledInput>

          {block.__typename === 'Text' &&
            <LabelledInput>
              <Label>Text</Label>

              <Textarea
                required
                placeholder="Required"
                defaultValue={block.editable_content}
                rows={12}
                onChange={this.handleContent}
                font="mono"
                f={3}
                lineHeight={2}
                ref={this.bodyRef}
              />
            </LabelledInput>
          }
        </Box>
      </TitledDialog>
    );
  }
}

export default graphql(updateBlockMutation, {
  name: 'updateBlock',
})(ManageBlock);
