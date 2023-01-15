import React from 'react'
import { CustomerPaymentMethods_me_customer } from '__generated__/CustomerPaymentMethods'

import Text from 'v2/components/UI/Text'
import Box from 'v2/components/UI/Box'
import RadioOptions from 'v2/components/UI/RadioOptions'
import { RemovePaymentMethod } from '../RemovePaymentMethod'

interface ManagePaymentMethodsProps {
  customer: CustomerPaymentMethods_me_customer
  onChangeDefaultPaymentMethod: (id: string) => void
}

export const ManagePaymentMethods: React.FC<ManagePaymentMethodsProps> = ({
  customer,
  onChangeDefaultPaymentMethod,
}) => {
  const { default_payment_method, payment_methods } = customer

  if (!default_payment_method) return null

  return (
    <RadioOptions
      value={default_payment_method.id}
      onSelect={onChangeDefaultPaymentMethod}
      size="1em"
    >
      {payment_methods.map((payment_method, i) => (
        <RadioOptions.Option
          key={payment_method.id}
          value={payment_method.id}
          borderTop={i === 0 ? '1px solid' : undefined}
          borderBottom="1px solid"
          borderColor="gray.light"
        >
          {() => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>
                {payment_method.card.brand.toUpperCase()} **
                {payment_method.card.last4}
                {' — '}
                {payment_method.card.exp_month}/{payment_method.card.exp_year}
              </Text>

              <Text f={1} color="state.alert" fontWeight="bold">
                <RemovePaymentMethod
                  id={payment_method.id}
                  onRemove={() => {}}
                />
              </Text>
            </Box>
          )}
        </RadioOptions.Option>
      ))}
    </RadioOptions>
  )
}
