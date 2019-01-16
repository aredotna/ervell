import { renderToStringWithData } from 'react-apollo';
import { ServerStyleSheet } from 'styled-components';

import { wrapWithProviders } from 'react/apollo';

export default (client, options = {}) => (Component, props = {}) => {
  const sheet = new ServerStyleSheet();
  const WrappedComponent = wrapWithProviders(client, options)(Component, props);

  return renderToStringWithData(sheet.collectStyles(WrappedComponent))
    .then((html) => {
      const state = client.extract();
      const styles = sheet.getStyleTags();

      return {
        html,
        state,
        styles,
        client,
      };
    });
};
