import React, { Component } from 'react'
import styled from 'styled-components'
import { themeGet } from 'styled-system'

import Box from 'v2/components/UI/Box'
import { Subheadline } from 'v2/pages/about/components/Text'

const CTA = styled(Box).attrs({
  py: 9,
  px: 3,
  borderBottom: '1px solid',
  borderColor: themeGet('colors.gray.regular'),
})``

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 2em 0;
  align-items: center;
  justify-content: center;
`

const Logo = styled.div.attrs({
  style: props => ({
    width: 171,
    height: 143,
    background: `url(${props.src}) center/70% no-repeat`,
  }),
})``

export default class UniversityLogoCta extends Component {
  render() {
    return (
      <CTA>
        <Subheadline>Where is Are.na used?</Subheadline>
        <LogoContainer>
          <Logo
            title="Columbia University"
            src="https://d2w9rnfcy7mm78.cloudfront.net/2988469/original_03d57a07ef74854e23ab06a98a769474.png?1541425408"
          />
          <Logo
            title="RISD"
            src="https://d2w9rnfcy7mm78.cloudfront.net/2988470/large_129b6d1047f2575d2fc4688c5b0c933a.png?1541425413"
          />
          <Logo
            title="The New School"
            src="https://d2w9rnfcy7mm78.cloudfront.net/2988468/original_9b2b78183e70b6c3d35030334b794a10.png?1541425406"
          />
          <Logo
            title="Brown"
            src="https://d2w9rnfcy7mm78.cloudfront.net/2988467/original_2bdb631f372dcf5899a1b48a3e6e8099.png?1541425402"
          />
          <Logo
            title="SVA"
            src="https://d2w9rnfcy7mm78.cloudfront.net/2988471/original_f6b6c46213a3788b7dabfbe059b7630f.png?1541425419"
          />
          <Logo
            title="NYU"
            src="https://d2w9rnfcy7mm78.cloudfront.net/2988474/original_9e5c4f68f7b2efe1c4db44cd4ee5fc3b.png?1541425430"
          />
          <Logo
            title="SAIC"
            src="https://d2w9rnfcy7mm78.cloudfront.net/2988476/original_cf964831e54804439a1257fe34970c4c.png?1541425436"
          />
          <Logo
            title="Yale"
            src="https://d2w9rnfcy7mm78.cloudfront.net/2988472/original_34933c6a1a052a409c90af78ee381f52.png?1541425425"
          />
          <Logo
            title="Harvard"
            src="https://d2w9rnfcy7mm78.cloudfront.net/2988480/original_b068b49911ced45b4dffe8b409910566.png?1541425442"
          />
          <Logo
            title="MIT"
            src="https://d2w9rnfcy7mm78.cloudfront.net/2988481/original_dfb329e1fd0b851947a7a649b0b12d88.png?1541425447"
          />
          <Logo
            title="Pratt"
            src="https://d2w9rnfcy7mm78.cloudfront.net/2988485/original_f915c828f48f21f027701ddc693b64c3.png?1541425455"
          />
          <Logo
            title="Wesleyan"
            src="https://d2w9rnfcy7mm78.cloudfront.net/2988483/original_e167dcf3383c576e445078f2d5bf2184.png?1541425453"
          />
        </LogoContainer>
      </CTA>
    )
  }
}
