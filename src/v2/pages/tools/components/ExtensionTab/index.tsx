import React from 'react'
import styled from 'styled-components'
import { browserName } from 'react-device-detect'

import Box from 'v2/components/UI/Box'
import GenericButton from 'v2/components/UI/GenericButton'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import Text from 'v2/components/UI/Text'

import { bookmarklet } from 'v2/pages/tools/components/ExtensionTab/bookmarklet'

const Container = styled(Box)`
  margin: 0 auto;
  max-width: 40em;
`

const PlusSign = styled(Box)`
  position: relative;

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    background-color: ${props => props.theme.colors.gray.base};
    width: 100%;
    height: 2px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  &:after {
    transform: translateY(-50%) rotate(90deg);
  }
`

interface ButtonWrapperProps {
  url: string
}

const ButtonWrapper: React.FC<ButtonWrapperProps> = ({ children, url }) => {
  return (
    <GenericButton
      mt={7}
      title={children}
      display="flex"
      f={5}
      minWidth="20em"
      href={url}
      target="_blank"
    >
      <PlusSign width="10px" height="10px" mr={[0, '0.5em']} />
      {children}
    </GenericButton>
  )
}

export const ExtensionTab: React.FC = () => {
  if (browserName === 'none') {
    return <LoadingIndicator mt={6} f={8} />
  }

  const url = {
    Safari:
      'https://apps.apple.com/us/app/are-na-for-safari/id1497800947?ls=1&mt=12',
    Chrome:
      'https://chrome.google.com/webstore/detail/arena/lkihjlcipnbgeokmfnpogjfflofbfhga',
    Firefox: 'https://addons.mozilla.org/en-US/firefox/addon/are-na/',
  }[browserName]

  if (!url) {
    return (
      <Container>
        <ButtonWrapper url={bookmarklet}>Add to Are.na</ButtonWrapper>
        <Text f={3} mt={4} textAlign="center">
          Drag this button to your bookmarks bar &#10548;
        </Text>
        <Text f={4} mt={8}>
          Install the bookmarklet to easily add images, videos, links, and text
          to your Are.na channels while elsewhere on the web.
        </Text>
      </Container>
    )
  }

  return (
    <Container>
      <ButtonWrapper url={url}>
        Install the {browserName} Extension
      </ButtonWrapper>
      <Text f={4} mt={8}>
        Install the {browserName} extension to easily add images, videos, links,
        and text to your Are.na channels while elsewhere on the web.
      </Text>
    </Container>
  )
}
