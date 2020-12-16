import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Specimen from 'v2/stories/__components__/Specimen'
import * as Banners from 'v2/components/Banners'

storiesOf('Banner', module).add('default', () => (
  <Specimen>
    <Banners.Confirm mb={6} isCloseable={false} />

    <Banners.Bookmarklet mb={6} onClose={action('onClose')} />

    <Banners.Invite mb={6} onClose={action('onClose')} />

    <Banners.ProposePremium mb={6} onClose={action('onClose')} />

    <Banners.StronglyProposePremium mb={6} onClose={action('onClose')} />

    <Banners.PremiumSupporter mb={6} onClose={action('onClose')} />
  </Specimen>
))
