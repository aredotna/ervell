import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { truncate } from 'v2/components/UI/Truncate'

const Container = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`

const QuestionMark = styled.div`
  position: absolute;
  bottom: 0.5em;
  right: 0.5em;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid ${props => props.theme.colors.gray.regular};
  width: 15px;
  height: 15px;
  border-radius: 15px;
  text-align: center;
`

const openHelp = () => {
  window.open(
    'http://help.are.na/knowledge_base/topics/how-do-i-use-the-browser-extension',
    '_blank'
  )
}

const CurrentPageInfo = ({ currentPage }) => (
  <Container>
    <Text f={4}>Saving as a link:</Text>
    <Text f={4} color="gray.medium" mt={4}>
      &quot;
      <span
        dangerouslySetInnerHTML={{
          __html: unescape(truncate(currentPage.title, 30)),
        }}
      />
      &quot;
    </Text>

    <Text f={2} font="mono" color="gray.medium" breakWord>
      (<u>{unescape(truncate(currentPage.url, 30))}</u>)
    </Text>

    <Text f={4} mt={7}>
      You can also drag text or images here
    </Text>

    <QuestionMark onClick={openHelp}>
      <Text f={2} fontWeight="bold" textAlign="center" color="gray.regular">
        ?
      </Text>
    </QuestionMark>
  </Container>
)

CurrentPageInfo.propTypes = {
  currentPage: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
}

export default CurrentPageInfo
