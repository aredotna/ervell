import styled from 'styled-components';
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import mount from 'lib/apollo';
import formatErrors from 'components/react/util/formatErrors';

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
    me {
      id
    }
    channel(id: "arena-influences") {
      title
      description(format: HTML)
    }
  }
`;

class Hello extends React.Component {
  state = {
    message: 'Click me.',
  }

  static defaultProps = {
    data: {
      loading: true,
      channel: {},
    }
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
      )
    }

    if (error) {
      return (
        <Container>
          <Message>
            {formatErrors(error)}
          </Message>
        </Container>
      )
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

        <Description dangerouslySetInnerHTML={{__html: description}}>
        </Description>
      </Container>
    );
  }
};

const HelloWithData = graphql(query)(Hello)

export default (selector = '#react-mount-hello') => {
  mount(HelloWithData, document.querySelector(selector));
};
