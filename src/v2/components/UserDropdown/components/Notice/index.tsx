import React, { useCallback, useState } from 'react'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'
import Banner from 'v2/components/UI/Banner'

import Text from 'v2/components/UI/Text'

import resendConfirmationEmailMutation from 'v2/components/Banners/mutations/resendConfirmationEmail'
import { ResendConfirmationEmail } from '__generated__/ResendConfirmationEmail'

const Copy = styled(Text).attrs({
  color: 'white',
  fontWeight: 'normal',
  boldLinks: true,
  align: 'left',
  f: 1,
})``

const Link = styled(Copy).attrs({
  fontWeight: 'bold',
  mt: 3,
})`
  cursor: pointer;
  margin-top: 1em !important;
`

const NoticeWrapper: React.FC = ({ children }) => {
  return (
    <Banner bg="brand.deepBlue" color="white" iconName="Info">
      {children}
    </Banner>
  )
}

export const ConfirmNotice: React.FC = () => {
  const [mode, setMode] = useState<'resting' | 'error' | 'sent' | 'sending'>(
    'resting'
  )
  const [resendConfirmation] = useMutation<ResendConfirmationEmail>(
    resendConfirmationEmailMutation
  )

  const handleClick = useCallback(() => {
    setMode('sending')
    resendConfirmation()
      .then(() => setMode('sent'))
      .catch(() => setMode('error'))
  }, [])

  return (
    <NoticeWrapper>
      <Copy>
        Please confirm your email address (check your spam folder if you
        can&#39;t find our email).{' '}
        <Link onClick={handleClick}>
          {
            {
              resting: 'Get a new confirmation email',
              sending: 'Sending...',
              sent: 'Sent',
              error: 'Error',
            }[mode]
          }
        </Link>
      </Copy>
    </NoticeWrapper>
  )
}

export default {
  CONFIRM: ConfirmNotice,
}
