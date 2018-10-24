import { renderToString } from 'react-dom/server';
import { getDataFromTree } from 'react-apollo';
import { ServerStyleSheet } from 'styled-components';

import { wrapWithProviders } from 'react/apollo';

export default (client, options = {}) => (Component, props = {}) => {
  const sheet = new ServerStyleSheet();
  const WrappedComponent = wrapWithProviders(client, options)(Component, props);

  const resolve = (error) => {
    const html = renderToString(sheet.collectStyles(WrappedComponent));
    const styles = sheet.getStyleTags();
    const state = client.extract();

    return {
      html,
      state,
      styles,
      client,
      error,
    };
  };

  return getDataFromTree(WrappedComponent)
    .then(resolve)
    .catch(resolve);
};
