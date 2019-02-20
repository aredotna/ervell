import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import constants from 'react/styles/constants';
import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import { GenericButtonLink as Button } from 'react/components/UI/GenericButton';

import WithLoginStatus from 'react/hocs/WithLoginStatus';

const Table = styled(Box).attrs({ mb: 7 })`
  display: flex;
  flex-direction: row;
  justify-content: center;
  
  ${constants.media.mobile`
    align-items: center;
    flex-direction: column;
  `}
`;

const Cell = styled(Box).attrs({
  py: [8, 6, 6],
  px: [7, 6, 6],
  width: [1, 1 / 3, 1 / 2],
})`
  display: flex;
  flex-direction: column;
  max-width: 20em;
  border-right: 2px solid ${x => x.theme.colors.gray.light};
  
  &:last-child {
    border-right-color: transparent;
  }

  ${constants.media.mobile`
    border-right: none;
    border-bottom: 2px solid ${x => x.theme.colors.gray.light};
  `}
`;

const PlanTitle = styled(Text).attrs({
  f: 2,
  fontWeight: 'bold',
})``;

const PlanPrice = styled(Text).attrs({
  f: 7,
  fontWeight: 'bold',
  color: 'black',
  pt: 4,
})``;

const PlanSubPrice = styled(Text).attrs({
  f: 4,
  color: 'gray.base',
})``;

const CTAButton = styled(Button).attrs({
  f: 5,
  flex: 1,
  mt: 9,
})``;

const PremiumButton = styled(CTAButton)`
  background-color: ${x => x.theme.colors.state.premium};
  border-color: ${x => x.theme.colors.state.premium};
  color: white;

  &:hover {
    border-color: ${x => x.theme.colors.state.premium};
    background-color: white;
    color: ${x => x.theme.colors.state.premium};
  }
`;

const GroupButton = styled(CTAButton)`
  background-color: ${x => x.theme.colors.gray.base};
  border-color: ${x => x.theme.colors.gray.base};
  color: white;

  &:hover {
    border-color: ${x => x.theme.colors.gray.base};
    background-color: white;
    color: ${x => x.theme.colors.gray.base};
  }
`;

const Features = styled(Box).attrs({
  mt: 7,
})``;

const Feature = styled(Text).attrs({
  f: 4,
  py: 3,
  color: 'black',
})``;

class PricingTable extends PureComponent {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  }

  render() {
    const { isLoggedIn } = this.props;

    const signUpLink = isLoggedIn ? '/' : '/sign_up';
    const upgradeLink = isLoggedIn ? '/settings/billing' : '/sign_up?redirect_to=/settings/billing';
    const groupLink = isLoggedIn ? '/getting-started-with-groups' : '/sign_up';

    return (
      <Table>
        <Cell>
          <PlanTitle>Are.na</PlanTitle>
          <PlanPrice>Free</PlanPrice>
          <PlanSubPrice>&nbsp;</PlanSubPrice>
          <CTAButton color="black" href={signUpLink}>Sign up</CTAButton>
          <Features>
            <Feature>Unlimited public blocks*</Feature>
            <Feature>Up to 100 private blocks</Feature>
          </Features>
        </Cell>
        <Cell>
          <PlanTitle color="state.premium">Are.na Premium</PlanTitle>
          <PlanPrice>$5 / month</PlanPrice>
          <PlanSubPrice>or $45 / year</PlanSubPrice>
          <PremiumButton href={upgradeLink}>Join w/ Premium</PremiumButton>
          <Features>
            <Feature>Unlimited public blocks*</Feature>
            <Feature fontWeight="bold">Unlimited private blocks</Feature>
            <Feature fontWeight="bold">Hide from search engines</Feature>
            <Feature fontWeight="bold">Priority support</Feature>
          </Features>
        </Cell>
        <Cell>
          <PlanTitle color="state.premium">Are.na Premium</PlanTitle>
          <PlanPrice>$5 / user / month</PlanPrice>
          <PlanSubPrice>or $45 / user / year</PlanSubPrice>
          <GroupButton href={groupLink}>Create group</GroupButton>
          <Features>
            <Feature>Unlimited public blocks*</Feature>
            <Feature>Unlimited private blocks</Feature>
            <Feature>Hide from search engines</Feature>
            <Feature>Priority support</Feature>
            <Feature fontWeight="bold">Upgrade team members</Feature>
          </Features>
        </Cell>
      </Table>
    );
  }
}

export default WithLoginStatus(PricingTable);
