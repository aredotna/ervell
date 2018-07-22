import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

const withBrowserRouter = (WrappedComponent) => {
  class WithBrowserRouter extends Component {
    render() {
      const { ...rest } = this.props;

      return (
        <BrowserRouter >
          <WrappedComponent {...rest} />
        </BrowserRouter>
      );
    }
  }

  return WithBrowserRouter;
};

export default withBrowserRouter;
