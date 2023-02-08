import { useElements, useStripe, AddressElement } from '@stripe/react-stripe-js'
import React, { useCallback, useState } from 'react'
import sharify from 'sharify'

import StripeElementsContext from 'v2/components/StripeElementsContext'
import Box from 'v2/components/UI/Box'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import TitledDialog from 'v2/components/UI/TitledDialog'
import { useMutation, useQuery } from '@apollo/client'
import { MyBillingAddressQuery } from '__generated__/MyBillingAddressQuery'
import myBillingAddressQuery from './queries/myBillingAddressQuery'
import {
  UpdateBillingAddressMutation,
  UpdateBillingAddressMutationVariables,
} from '__generated__/UpdateBillingAddressMutation'
import updateBillingAddressMutation from './mutations/updateBillingAddressMutation'
import { StripeAddressElementChangeEvent } from '@stripe/stripe-js'

const {
  data: { GOOGLE_MAPS_API_KEY },
} = sharify

interface MyBillingAddressProps {
  onDone?: () => void
}

export const MyBillingAddress: React.FC<MyBillingAddressProps> = ({
  onDone,
}) => {
  const stripe = useStripe()
  const elements = useElements()

  const [mode, setMode] = useState<'default' | 'saving' | 'saved' | 'error'>(
    'default'
  )

  const { data, loading } = useQuery<MyBillingAddressQuery>(
    myBillingAddressQuery
  )
  const [updateBillingAddress] = useMutation<
    UpdateBillingAddressMutation,
    UpdateBillingAddressMutationVariables
  >(updateBillingAddressMutation)

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      e.stopPropagation()

      if (!stripe || !elements) {
        return
      }

      setMode('saving')

      const address = elements.getElement('address') as any

      address.getValue().then((result: StripeAddressElementChangeEvent) => {
        updateBillingAddress({
          variables: {
            line1: result.value.address.line1,
            line2: result.value.address.line2,
            city: result.value.address.city,
            state: result.value.address.state,
            postal_code: result.value.address.postal_code,
            country: result.value.address.country,
          },
        })
          .then(() => {
            setMode('saved')
            onDone()
          })
          .catch(() => {
            setMode('error')
          })
      })
    },
    [stripe, elements, setMode]
  )

  if (!stripe || !elements) {
    return null
  }

  return (
    <TitledDialog
      title="Billing address"
      label={
        {
          saving: 'Saving...',
          saved: 'Saved!',
          error: 'Error',
        }[mode] || 'Update billing address'
      }
      disabled={mode === 'saving'}
      onDone={handleSubmit}
    >
      {loading && <LoadingIndicator />}

      {!loading && (
        <Box mb={7}>
          <AddressElement
            options={{
              mode: 'billing',
              autocomplete: {
                mode: 'google_maps_api',
                apiKey: GOOGLE_MAPS_API_KEY,
              },
              defaultValues: {
                name: data.me?.name,
                address: {
                  line1: data?.me?.customer?.address?.line1,
                  line2: data?.me?.customer?.address?.line2,
                  city: data?.me?.customer?.address?.city,
                  state: data?.me?.customer?.address?.state,
                  postal_code: data?.me?.customer?.address?.postal_code,
                  country: data?.me?.customer?.address?.country,
                },
              },
            }}
          />
        </Box>
      )}
    </TitledDialog>
  )
}

export const MyBillingAddressWrapper: React.FC<MyBillingAddressProps> = ({
  onDone,
}) => {
  return (
    <StripeElementsContext>
      <MyBillingAddress onDone={onDone} />
    </StripeElementsContext>
  )
}
