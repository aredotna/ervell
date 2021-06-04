import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import BorderedBox from 'v2/components/UI/BorderedBox'
import Text from '../UI/Text'
import Box from 'v2/components/UI/Box'
import Icons from 'v2/components/UI/Icons'
import DividerButton from 'v2/components/UI/Buttons/components/DividerButton'

import constants from 'v2/styles/constants'
import useSerializedMe from 'v2/hooks/useSerializedMe'
import { DropshadowButtonLink } from '../UI/Buttons/components/DropshadowButton'
import { useMutation } from '@apollo/client'
import {
  dismissBannerMutation,
  dismissBannerMutationVariables,
} from '__generated__/dismissBannerMutation'
import dismissMonthlyBanner from './mutations/dismissMonthlyBanner'
import { BannerEnum } from '__generated__/globalTypes'

const Wrapper = styled(Box)`
  position: fixed;
  top: ${constants.topBarHeight};
  margin-top: ${props => props.theme.space[2]};
  right: ${props => props.theme.space[8]};
  z-index: ${constants.z.modal};
`

const Container = styled(BorderedBox).attrs({
  width: '18em',
})`
  height: 100%;
`

const Inner = styled(Box).attrs({
  p: 4,
  pb: 0,
})``

const Copy = styled(Text).attrs({
  f: 1,
  lineHeight: 2,
  color: 'gray.bold',
  boldLinks: true,
})`
  p {
    margin-top: ${props => props.theme.space[6]};
  }
`

export const MonthlyPremiumReminder: React.FC = () => {
  const { name } = useSerializedMe()
  const [mode, setMode] = useState<'open' | 'closed'>('open')
  const [dismissBanner] = useMutation<
    dismissBannerMutation,
    dismissBannerMutationVariables
  >(dismissMonthlyBanner)

  const handleClose = useCallback(() => {
    setMode('closed')
    dismissBanner({
      variables: { banner: BannerEnum.MONTHLY_PREMIUM_REMINDER },
    })
  }, [dismissBanner])

  if (mode === 'closed') {
    return null
  }

  return (
    <Wrapper>
      <Container>
        <Inner>
          <Copy>
            <p>
              Hi, {name}. Every month we rely on member subscriptions to build
              and maintain Are.na.
            </p>

            <p>
              With a Premium membership you get unlimited blocks, more privacy
              settings, Reader mode and more.
            </p>
          </Copy>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            my={7}
          >
            <DropshadowButtonLink href="/settings/billing" target="_blank">
              Upgrade to Premium <Icons name="ArenaMark" size={6} ml={3} />
            </DropshadowButtonLink>
          </Box>

          <Copy>
            <p>
              You can see where your subscription goes on our{' '}
              <a href="/roadmap" target="_blank">
                Roadmap
              </a>{' '}
              page, which shows what we’re currently working on, how we’re doing
              and what the long-term plans are.
            </p>

            <p>
              Thank you for considering,
              <br />
              Are.na Team
            </p>
          </Copy>

          <DividerButton mt={8} onClick={handleClose}>
            Close
          </DividerButton>
        </Inner>
      </Container>
    </Wrapper>
  )
}

export default MonthlyPremiumReminder
