import { renderToString } from 'react-dom/server';
import { getDataFromTree } from 'react-apollo';
import { ServerStyleSheet } from 'styled-components';

import { wrapWithApolloProvider } from 'react/apollo';

export default client => (component, props = {}) => {
  const sheet = new ServerStyleSheet();
  const WrappedComponent = wrapWithApolloProvider(client)(component, props);

  return getDataFromTree(WrappedComponent)
    .then(() => {
      const html = renderToString(sheet.collectStyles(WrappedComponent));
      const styles = sheet.getStyleTags();
      const state = client.extract();

      return {
        html,
        state,
        styles,
      };
    });
};
