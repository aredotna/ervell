import React from 'react'
import styled, { css } from 'styled-components'
import { space } from 'styled-system'

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
`

const TabContent = styled.div`
  display: flex;
`

export const activeMixin = css`
  border-top: 2px solid ${x => x.theme.colors.gray.bold};
  border-left: 1px solid ${x => x.theme.colors.gray.regular};
  border-right: 1px solid ${x => x.theme.colors.gray.regular};
  color: ${x => x.theme.colors.gray.bold};
  background-color: white;
`

const Label = styled.a.attrs({ fontSize: 3 })`
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
`

interface TabItemProps {
  url: string
  label: string
  active?: boolean
}

interface TabsProps {
  tabs: TabItemProps[]
}

const Tab: React.FC<TabItemProps> = ({ url, label, active }) => {
  return (
    <Label active={active} href={url}>
      {label}
    </Label>
  )
}

const Tabs: React.FC<TabsProps> = ({ tabs, children }) => {
  return (
    <Container>
      <TabList>
        {tabs.map(({ url, label, active }) => {
          return <Tab key={url} active={active} url={url} label={label} />
        })}
      </TabList>

      <TabContent>{children}</TabContent>
    </Container>
  )
}

export default Tabs
