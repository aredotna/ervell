import React, { PureComponent } from 'react';
import styled from 'styled-components';

import constants from 'react/styles/constants';
import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

import { Headline, Subheadline, Description } from 'react/pages/about/components/Text';
import CenterBox from 'react/pages/about/components/CenterBox';
import PricingTable from 'react/pages/about/PricingPage/components/PricingTable';

const Container = styled.div`
  margin-top: 4em;
`;

const GradientContent = styled.div`
  width: 100%;
  padding-bottom: 0;
  background: linear-gradient(${x => x.theme.colors.gray.hint}, white);
  border-top: 1px solid ${x => x.theme.colors.gray.regular};
`;

const CTA = styled(Box)`
  border-bottom: 1px solid ${x => x.theme.colors.gray.light};
`;

const Feature = styled(Text).attrs({
  f: 5,
  color: 'black',
  textAlign: 'left',
  py: 3,
  px: 5,
})`
  &:before {
    content: '• ';
  }
`;

const LogoContainer = styled(Box)`
  max-width: auto;
  border-bottom: 1px solid ${x => x.theme.colors.gray.light};

  ${constants.media.mobile`
    display: none;
  `}
`;

const Logos = styled.img`
  width: 80%;
  margin: 3em auto 0;
  display: block;
`;

const Question = styled(Subheadline).attrs({
  color: 'gray.bold',
  mb: 6,
})``;

const Answer = styled(Description).attrs({
  textAlign: 'left',
  pb: 8,
})``;

export default class PricingPage extends PureComponent {
  render() {
    return (
      <Container>
        <Headline color="gray.bold" pb={6} px={[6, 0, 0]}>
          Organize your Internet. Expand your brain.
        </Headline>

        <PricingTable />

        <Text f={3} color="gray.medium" textAlign="center" pb={6}>
          *A block is an individual piece of content.
          Blocks can be images, text, links, attachments, or embeds.
        </Text>
        <Text f={4} color="black" textAlign="center" pb={9}>
          We offer a 50% discount on Premium plans for<br />students and educators.&nbsp;
          <strong><a href="/education">Learn more</a></strong>
        </Text>
        <GradientContent>
          <CTA>
            <CenterBox mt={9} mb={6} pb={9}>
              <Headline color="gray.bold" mb={3}>
                What features come free?
              </Headline>
              <Feature>
                Upload any file type
              </Feature>
              <Feature>
                Save web pages, images, PDFs, videos, and more
              </Feature>
              <Feature>
                Add links or text snippets while browsing the web
              </Feature>
              <Feature>
                Customize your profile page with a bio and links
              </Feature>
              <Feature>
                Use our API to display content elsewhere
              </Feature>
              <Feature>
                Make channels open to anyone, closed to just collaborators, or completely private
              </Feature>
              <Feature>
                Export Channels as PDF, ZIP, and HTML
              </Feature>
              <Feature>
                Invite friends and colleagues to collaborate on specific channels
              </Feature>
              <Feature>
                much more...
              </Feature>
            </CenterBox>
          </CTA>
          <LogoContainer px={9} mt={9} mb={6} pb={9} maxWidth="100%">
            <Subheadline color="gray.bold" mb={3}>
              Are.na is used by people and teams at:
            </Subheadline>
            <Logos src="https://d2w9rnfcy7mm78.cloudfront.net/3292656/original_33a711d0ffabc169566d37a824d74adf.png?1546460030" alt="brand logos" />
          </LogoContainer >
          <CenterBox mt={9} mb={6} pb={9}>
            <Subheadline color="gray.bold" mb={8}>
              FAQs
            </Subheadline>

            <Question>
              Why do most people upgrade to Are.na Premium?
            </Question>
            <Answer>
              The main reason is privacy.
              With a regular plan you can only hide 100 “blocks,” or
              individual pieces of content on Are.na.
              Premium gives you unlimited space to collaborate
              privately for personal or professional purposes.
            </Answer>

            <Question>
              What are blocks and channels?
            </Question>
            <Answer>
              A block is any individual piece of content on Are.na,
              such as an image, a document, a video, or a web page.
              You add blocks to collections called channels.
              <br /><br />
              You can connect any block you see on Are.na to one of your
              own channels by clicking the “connect” button. You can also
              add one channel to another channel the same way. Very meta.
            </Answer>

            <Question>
              What happens if I hit the private block limit on the regular plan?
            </Question>
            <Answer>
              You’ll be prompted to upgrade to Premium.
              You can still use Are.na as normal, you just won’t be
              able to add more private blocks.
            </Answer>

            <Question>
              Can I collaborate with other people on Are.na without paying?
            </Question>
            <Answer>
              Of course! The whole point of Are.na is to build channels
              together and learn from one another. You’ll still be limited
              to 100 private blocks, but you can collaborate on as many public channels as you want.
            </Answer>

            <Question>
              Can I pay month-to-month for my Are.na Premium membership?
            </Question>
            <Answer>
              Yes.
              <br /><br />
              Are.na Premium costs $5 per month or $45 per year, depending on how you prefer to pay.
            </Answer>

            <Question>
              How does Are.na process my payment? Can I pay with Paypal?
            </Question>
            <Answer>
              We handle billing via Stripe. If you’d like to use Paypal instead, please email us at <strong><a href="mailto:help@are.na">help@are.na</a></strong>.
            </Answer>
          </CenterBox>
        </GradientContent>
      </Container>
    );
  }
}
