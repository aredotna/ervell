import { useMutation, useQuery } from '@apollo/client'
import { useTheme } from 'styled-components'

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useCallback, useState } from 'react'

import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import TitledDialog from 'v2/components/UI/TitledDialog'

import { CustomerPaymentMethods } from '__generated__/CustomerPaymentMethods'
import StripeElementsContext from '../StripeElementsContext'
import Box from '../UI/Box'
import Text from '../UI/Text'
import { ManagePaymentMethods } from './components/ManagePaymentMethods'
import addNewPaymentMethod from './mutations/addNewPaymentMethod'
import customerPaymentMethods from './queries/customerPaymentMethods'

import {
  AddPaymentMethod,
  AddPaymentMethodVariables,
} from '__generated__/AddPaymentMethod'
import {
  ChangeDefaultPaymentMethod,
  ChangeDefaultPaymentMethodVariables,
} from '__generated__/ChangeDefaultPaymentMethod'
import changeDefaultPaymentMethod from './mutations/changeDefaultPaymentMethod'

interface MyPaymentMethodProps {
  onDone?: () => void
}

export const MyPaymentMethod: React.FC<MyPaymentMethodProps> = ({ onDone }) => {
  const stripe = useStripe()
  const elements = useElements()

  const [mode, setMode] = useState<'default' | 'saving' | 'saved' | 'error'>(
    'default'
  )
  const [page, setPage] = useState<'default' | 'new' | 'manage'>('manage')
  const [defaultPaymentMethodId, setDefaultPaymentMethodId] = useState<
    string | null
  >(null)

  const { data, loading } = useQuery<CustomerPaymentMethods>(
    customerPaymentMethods
  )
  const [addPaymentMethod] = useMutation<
    AddPaymentMethod,
    AddPaymentMethodVariables
  >(addNewPaymentMethod)
  const [changeDefaultPayment] = useMutation<
    ChangeDefaultPaymentMethod,
    ChangeDefaultPaymentMethodVariables
  >(changeDefaultPaymentMethod)

  const addNewCard = useCallback(async () => {
    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      return
    }

    return stripe
      .createPaymentMethod({
        type: 'card',
        card: cardElement,
      })
      .then(({ error, paymentMethod }) => {
        if (error) {
          setMode('error')
          return
        }

        if (!paymentMethod) {
          setMode('error')
          return
        }

        return addPaymentMethod({ variables: { token: paymentMethod.id } })
      })
  }, [elements, stripe])

  const changeDefaultCard = useCallback(async () => {
    console.log({ defaultPaymentMethodId })
    if (!defaultPaymentMethodId) {
      return
    }

    return changeDefaultPayment({
      variables: { default_payment_method_id: defaultPaymentMethodId },
    })
  }, [defaultPaymentMethodId])

  const handleChangeDefaultCard = useCallback(
    id => {
      console.log({ id })
      setDefaultPaymentMethodId(id)
    },
    [setDefaultPaymentMethodId]
  )

  const navigateTo = useCallback(
    (page: 'default' | 'new' | 'manage') => {
      setPage(page)
    },
    [setPage]
  )

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      e.stopPropagation()

      if (page === 'default') {
        return false
      }

      const mutation = {
        new: addNewCard,
        manage: changeDefaultCard,
      }[page]

      setMode('saving')

      return mutation()
        .then(() => {
          setMode('saved')
          onDone()
        })
        .catch(error => {
          console.error(error)
          setMode('error')
        })
    },
    [page, changeDefaultCard, addNewCard, onDone]
  )

  const theme = useTheme()

  if (!stripe || !elements) {
    return null
  }

  return (
    <TitledDialog
      title="Billed to"
      label={
        {
          saving: 'Saving...',
          saved: 'Saved!',
          error: 'Error',
        }[mode] ||
        {
          default: 'Done',
          new: 'Save billing information',
          manage: 'Update billing information',
        }[page]
      }
      disabled={mode === 'saving'}
      onDone={handleSubmit}
    >
      {loading && <LoadingIndicator />}

      {page === 'manage' && data && (
        <ManagePaymentMethods
          customer={data.me.customer}
          onChangeDefaultPaymentMethod={handleChangeDefaultCard}
        />
      )}

      {page === 'new' && (
        <Box
          border="1px solid"
          borderRadius="0.25em"
          borderColor="gray.light"
          p={4}
          mt={4}
        >
          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  fontSize: '14px',
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: 100,
                  color: theme.colors.gray.bold,
                  '::placeholder': {
                    color: theme.colors.gray.medium,
                  },
                },
              },
            }}
          />
        </Box>
      )}

      {!loading && page !== 'new' && (
        <Text f={1} my={6} px={6} fontWeight="bold">
          <a onClick={() => navigateTo('new')} role="button" tabIndex={0}>
            + Add new card
          </a>
        </Text>
      )}
    </TitledDialog>
  )
}

export const MyPaymentMethodWrapper: React.FC<MyPaymentMethodProps> = ({
  onDone,
}) => {
  return (
    <StripeElementsContext>
      <MyPaymentMethod onDone={onDone} />
    </StripeElementsContext>
  )
}
