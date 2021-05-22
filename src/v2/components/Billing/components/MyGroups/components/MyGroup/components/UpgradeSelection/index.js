import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import upgradeSelectionFragment from 'v2/components/Billing/components/MyGroups/components/MyGroup/components/UpgradeSelection/fragments/upgradeSelection'
import userSelectorFragment from 'v2/components/Billing/components/MyGroups/components/UserSelection/components/UserSelector/fragments/userSelector'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import RadioOptions from 'v2/components/UI/RadioOptions'
import UpgradeCTA from 'v2/components/Billing/components/MyGroups/components/MyGroup/components/UpgradeSelection/components/UpgradeCTA'

const OptionLabel = styled(Text).attrs({
  f: 4,
  mb: 2,
  color: 'gray.medium',
})`
  display: flex;
  justify-content: space-between;

  ${props =>
    props.selected &&
    `
    color: ${props.theme.colors.gray.bold};
  `}
`

const Option = styled(Box)`
  &:hover ${OptionLabel} {
    color: ${props => props.theme.colors.gray.bold};
  }
`

const OptionDescription = styled(Text).attrs({
  f: 2,
  color: 'gray.medium',
})`
  display: flex;
  justify-content: space-between;

  > span:first-child {
    max-width: 75%;
  }
`

export default class UpgradeSelection extends PureComponent {
  static propTypes = {
    group: propType(upgradeSelectionFragment).isRequired,
    upgradeableUsers: PropTypes.arrayOf(propType(userSelectorFragment))
      .isRequired,
    onSelect: PropTypes.func.isRequired,
    onAddUser: PropTypes.func.isRequired,
    onRemoveUser: PropTypes.func.isRequired,
    selectedPlan: PropTypes.oneOf(['basic', 'monthly', 'yearly']).isRequired,
  }

  render() {
    const {
      group,
      selectedPlan,
      upgradeableUsers,
      onSelect,
      onAddUser,
      onRemoveUser,
    } = this.props

    return (
      <RadioOptions value={selectedPlan} onSelect={onSelect}>
        {({ selectedValue, ...rest }) => (
          <div>
            <RadioOptions.Option
              selectedValue={selectedValue}
              value="basic"
              {...rest}
            >
              {({ selected }) => (
                <Option>
                  <OptionLabel selected={selected}>
                    <strong>Don’t upgrade</strong>
                  </OptionLabel>

                  <OptionDescription>
                    <span>
                      Non-Premium members are limited to 50 private blocks.
                    </span>
                  </OptionDescription>
                </Option>
              )}
            </RadioOptions.Option>

            <RadioOptions.Option
              selectedValue={selectedValue}
              value="yearly"
              {...rest}
            >
              {({ selected }) => (
                <Option>
                  <OptionLabel selected={selected}>
                    <strong>Upgrade users to annual Premium</strong>
                    <strong>$3.75 / user / month</strong>
                  </OptionLabel>

                  <OptionDescription>
                    <span>
                      Selected members can upload unlimited private blocks, hide
                      from search engines, and get early access to new products
                      and features.
                    </span>

                    <span>$45 billed yearly</span>
                  </OptionDescription>
                </Option>
              )}
            </RadioOptions.Option>

            {selectedValue === 'yearly' && (
              <UpgradeCTA
                my={6}
                term="year"
                group={group}
                upgradeableUsers={upgradeableUsers}
                onAddUser={onAddUser}
                onRemoveUser={onRemoveUser}
              />
            )}

            <RadioOptions.Option
              selectedValue={selectedValue}
              value="monthly"
              {...rest}
            >
              {({ selected }) => (
                <Option>
                  <OptionLabel selected={selected}>
                    <strong>Upgrade users to monthly Premium</strong>
                    <strong>$5 / user / month</strong>
                  </OptionLabel>

                  <OptionDescription>
                    <span>
                      Selected members can upload unlimited private blocks, hide
                      from search engines, and get early access to new products
                      and features.
                    </span>
                  </OptionDescription>
                </Option>
              )}
            </RadioOptions.Option>

            {selectedValue === 'monthly' && (
              <UpgradeCTA
                my={6}
                term="month"
                group={group}
                upgradeableUsers={upgradeableUsers}
                onAddUser={onAddUser}
                onRemoveUser={onRemoveUser}
              />
            )}
          </div>
        )}
      </RadioOptions>
    )
  }
}
