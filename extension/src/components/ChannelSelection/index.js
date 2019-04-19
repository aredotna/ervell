import React, { PureComponent } from 'react';

import Layout from 'extension/src/components/Layout';
// import withExtensionContext from 'extension/src/components/Extension/withExtension';
import Box from 'react/components/UI/Box';
import Search from 'extension/src/components/ChannelSelection/components/Search';
import RecentChannels from 'extension/src/components/ChannelSelection/components/RecentChannels';
import AllChannels from 'extension/src/components/ChannelSelection/components/AllChannels';

class ChannelSelection extends PureComponent {
  render() {
    return (
      <Layout>
        <Box mt={9} width="100%">
          <Search />
          <RecentChannels />
          <AllChannels />
        </Box>
      </Layout>
    );
  }
}

export default ChannelSelection;
