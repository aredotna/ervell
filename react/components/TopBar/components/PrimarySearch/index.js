import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Box from 'react/components/UI/Box';
import HomeLink from 'react/components/TopBar/components/PrimarySearch/components/HomeLink';
import Overlay from 'react/components/UI/Overlay';
import SearchInput from 'react/components/UI/SearchInput';
import PrimarySearchResults from 'react/components/TopBar/components/PrimarySearch/components/PrimarySearchResults';

const Container = styled(Box)`
  position: relative;
`;

export default class PrimarySearch extends PureComponent {
  constructor(props) {
    super(props);

    this.searchInputRef = React.createRef();
  }

  state = {
    mode: 'focus',
    query: 'xxx',
  }

  handleQuery = (query) => {
    this.setState({ query });
  }

  handleBlur = () => {
    if (this.state.query) {
      this.setState({ mode: 'blur' });
      return;
    }

    this.setState({ mode: 'resting' });
  }

  handleFocus = () =>
    this.setState({ mode: 'focus' });

  render() {
    const { mode, query } = this.state;

    return (
      <Container
        {...this.props}
      >
        {mode === 'resting' &&
          <HomeLink />
        }

        <SearchInput
          placeholder="Search Are.na"
          borderColor="transparent"
          query={query}
          onDebouncedQueryChange={this.handleQuery}
          ref={this.searchInputRef}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />

        {query && mode === 'focus' &&
          <Overlay
            targetEl={() => this.searchInputRef.current}
            fullWidth
          >
            <PrimarySearchResults query={query} />
          </Overlay>
        }
      </Container>
    );
  }
}
