import React from 'react'
import styled from 'styled-components'
import { Query } from '@apollo/client/react/components'

import { KonnectableChannelPreview as KonnectableChannelPreviewData } from '__generated__/KonnectableChannelPreview'

import konnectableChannelPreviewQuery from 'v2/components/Cell/components/Konnectable/components/KonnectableChannelPreview/queries/konnectableChannelPreview'

import Box from 'v2/components/UI/Box'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import DividerButton from 'v2/components/UI/Buttons/components/DividerButton'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import KonnectableChannelPreviewConnectables from 'v2/components/Cell/components/Konnectable/components/KonnectableChannelPreviewConnectables'

const Container = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Preview = styled(Box)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};

  &:hover {
    opacity: 0.5;
  }
`

interface Props {
  id: number | string
  onClose: (args?: any) => any
  amount?: number
  color?: string
}

export const KonnectableChannelPreview: React.FC<Props> = ({
  id,
  amount = 10,
  color = null,
  onClose,
  ...rest
}) => (
  <Container {...rest}>
    <Preview>
      <Query<KonnectableChannelPreviewData>
        query={konnectableChannelPreviewQuery}
        variables={{ id, amount }}
      >
        {({ data, error, loading }) => {
          if (error) {
            return <ErrorAlert>{error.message}</ErrorAlert>
          }

          const Indicator = () => (
            <LoadingIndicator mt={6} f={8} color={color} />
          )

          if (loading) return <Indicator />

          const {
            channel: { preview_connectables },
          } = data

          return (
            <KonnectableChannelPreviewConnectables
              connectables={preview_connectables}
              LoadingIndicator={Indicator}
            />
          )
        }}
      </Query>
    </Preview>

    <DividerButton f={4} color={color} onClick={onClose}>
      Stop Preview
    </DividerButton>
  </Container>
)

export default KonnectableChannelPreview
