import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import mount from 'react/apollo';
import formatErrors from 'react/util/formatErrors';

const Container = styled.div`
  border: 1px solid yellow;
`;

const Message = styled.div`
  color: red;
`;

const Title = styled.div`
  color: green;
`;

const Description = styled.div`
  color: blue;
`;

const query = gql`
  {
    channel(id: "arena-influences") {
      title
      description(format: HTML)
    }
  }
`;

export class Hello extends Component {
  static defaultProps = {
    data: {
      loading: true,
      channel: {},
    },
  }

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      channel: PropTypes.object,
    }),
  }

  state = {
    message: 'Click me.',
  }

  hello = () => {
    this.setState({
      message: 'Hello.',
    });
  }

  render() {
    const { data: { loading, error } } = this.props;

    if (loading) {
      return (
        <Container>
          <Message>
            Loading...
          </Message>
        </Container>
      );
    }

    if (error) {
      return (
        <Container>
          <Message>
            {formatErrors(error)}
          </Message>
        </Container>
      );
    }

    const { message } = this.state;
    const { data: { channel: { title, description } } } = this.props;

    return (
      <Container>
        <Message onClick={this.hello}>
          {message}
        </Message>

        <Title>
          {title}
        </Title>

        <Description dangerouslySetInnerHTML={{ __html: description }} />
      </Container>
    );
  }
}

export const HelloWithData = graphql(query)(Hello);

export default (selector = '#react-mount-hello') => {
  mount(HelloWithData, {}, document.querySelector(selector));
};
