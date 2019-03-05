import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'react-apollo';

import createCommentMutation from 'react/components/BlockLightbox/components/BlockLightboxAddComment/mutations/createComment';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import { FilledButton } from 'react/components/UI/Buttons';
import { Textarea } from 'react/components/UI/Inputs';

const Tip = styled(Box)`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
`;

class BlockLightboxAddComment extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    createComment: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
    comment: '',
  }

  handleChange = ({ target: { value: comment } }) => {
    const mode = comment === '' ? 'resting' : 'active';
    this.setState({ mode, comment });
  }

  handleKeyDown = (e) => {
    const { key, shiftKey } = e;

    if (key === 'Enter' && !shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      this.handleSubmit();
    }

    // Allows <shift+enter> to pass through
  }

  handleSubmit = () => {
    const { createComment, id: block_id } = this.props;
    const { comment: body, mode } = this.state;

    if (mode === 'resting') return;

    this.setState({ mode: 'submitting' });

    createComment({ variables: { body, block_id } })
      .then(() => {
        this.setState({ mode: 'done', comment: '' });
        setTimeout(() =>
          this.setState(prevState => ({
            mode: prevState.comment === '' ? 'resting' : 'active',
          })), 2500);
      })
      .catch(() => {
        // TODO: Map errors (force a return here)
      });
  }

  render() {
    const { mode, comment } = this.state;
    const { ...rest } = this.props;

    return (
      <Box {...rest}>
        <Box position="relative">
          <Textarea
            f={3}
            value={comment}
            bg="gray.hint"
            border={0}
            placeholder="Add new comment"
            rows={4}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />

          {mode === 'active' &&
            <Tip pb={3}>
              <Text f={0} color="gray.regular">
                shift + enter for line break
              </Text>
            </Tip>
          }
        </Box>

        <Box mt={6} textAlign="center">
          <FilledButton disabled={mode !== 'active'} onClick={this.handleSubmit}>
            {{
              resting: 'Add comment',
              active: 'Add comment',
              submitting: 'Adding...',
              done: 'Added!',
              error: 'Error',
            }[mode]}
          </FilledButton>
        </Box>
      </Box>
    );
  }
}

export default graphql(createCommentMutation, {
  name: 'createComment',
})(BlockLightboxAddComment);
