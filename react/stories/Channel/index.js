import React from 'react';
import { storiesOf } from '@storybook/react';

import MockChannel from 'react/stories/Channel/MockChannel';

import ChannelBreadcrumb from 'react/components/ChannelMetadata/components/ChannelBreadcrumb';
import ChannelMetadataInfo from 'react/components/ChannelMetadata/components/ChannelMetadataInfo';

storiesOf('Channel', module)
  .add('Breadcrumb', () => (
    <MockChannel ChannelComponent={ChannelBreadcrumb} />
  )).add('Info', () => (
    <MockChannel ChannelComponent={ChannelMetadataInfo} />
  ));
