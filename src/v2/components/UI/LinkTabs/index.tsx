import React from 'react'
import styled, { css } from 'styled-components'
import { space } from 'styled-system'
import { Link } from 'react-router-dom'

import constants from 'v2/styles/constants'

import { baseMixin } from 'v2/components/UI/Text'
import { preset } from 'v2/styles/functions'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const TabList = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  display: flex;
  border-bottom: 1px solid ${x => x.theme.colors.gray.regular};

  ${constants.media.mobile`
    flex-direction: column;
    align-items: flex-start;
    ${preset(space, { mx: 4 })};
    position: relative;
    margin-right: ${constants.blockGutter};
    margin-left: ${constants.blockGutter};
  `}
`

const TabContent = styled.div`
  display: flex;
`

export const activeMixin = css`
  border-top: 2px solid ${x => x.theme.colors.gray.bold};
  border-left: 1px solid ${x => x.theme.colors.gray.regular};
  border-right: 1px solid ${x => x.theme.colors.gray.regular};
  color: ${x => x.theme.colors.gray.bold};
  background-color: ${props => props.theme.colors.background};

  ${constants.media.mobile`
    border: none;
    background-color: ${x => x.theme.colors.gray.hint};
  `}
`

export const Label = styled(Link).attrs({ fontSize: 3 })<{ active: boolean }>`
  display: block;
  text-align: center;
  border: 1px solid transparent;
  border-top: 2px solid transparent;
  cursor: pointer;
  margin-bottom: -1px;
  font-weight: bold;

  ${preset(space, { pt: 5, pb: 6, px: 9 })};
  ${baseMixin};

  ${x => x.active && activeMixin};

  ${constants.media.mobile`
    border: none;
    ${preset(space, { pt: 5, pb: 6, px: 0 })};
    text-align: left;
    flex: 1;
    width: 100%;
  `}
`

interface TabItemProps {
  url: string
  label: string
  active?: boolean
  LabelComponent?: any
}

interface TabsProps {
  tabs: TabItemProps[]
}

const Tab: React.FC<TabItemProps> = ({
  url,
  label,
  active,
  LabelComponent,
}) => {
  if (LabelComponent) {
    return (
      <LabelComponent active={active} to={url}>
        {label}
      </LabelComponent>
    )
  }

  return (
    <Label active={active} to={url}>
      {label}
    </Label>
  )
}

const Tabs: React.FC<TabsProps> = ({ tabs, children }) => {
  return (
    <Container>
      <TabList>
        {tabs.map(({ url, label, active, LabelComponent }) => {
          return (
            <Tab
              key={url}
              active={active}
              url={url}
              label={label}
              LabelComponent={LabelComponent}
            />
          )
        })}
      </TabList>

      <TabContent>{children}</TabContent>
    </Container>
  )
}

export default Tabs
