import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Specimen from 'react/stories/__components__/Specimen';
import * as Banners from 'react/components/Banners';

storiesOf('Banner', module)
  .add('default', () => (
    <Specimen>
      <Banners.Confirm mb={6} isCloseable={false} />

      <Banners.Bookmarklet mb={6} onClose={action('onClose')} />

      <Banners.Invite mb={6} onClose={action('onClose')} />

      <Banners.ProposePremium mb={6} onClose={action('onClose')} />

      <Banners.StronglyProposePremium mb={6} onClose={action('onClose')} />

      <Banners.LoggedOutExplore mb={6} isCloseable={false} />

      <Banners.LoggedOutProfile mb={6} isCloseable={false} name="Foo Bar" />
    </Specimen>
  ));
