import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Modal from 'v2/components/UI/Modal'
import { MyPaymentMethodWrapper } from 'v2/components/MyPaymentMethod'

import myGroupUpcomingInvoice from './queries/myGroupUpcomingInvoice'
import createCustomerPortalSession from 'v2/components/Billing/components/UpcomingInvoice/mutations/createCustomerPortalSession'

import { CreateCustomerPortalSession } from '__generated__/CreateCustomerPortalSession'
import {
  MyGroupUpcomingInvoice,
  MyGroupUpcomingInvoiceVariables,
} from '__generated__/MyGroupUpcomingInvoice'
import { centsToDollarsAndCents } from 'v2/pages/about/PricingPage/components/PricingTable'
import { capitalize } from 'lodash'

const Link = styled(Text).attrs({
  f: 2,
  color: 'gray.semiBold',
  fontWeight: 'bold',
})`
  cursor: pointer;
  display: inline-block;

  &:hover {
    color: ${x => x.theme.colors.gray.bold};
  }
`

interface MyGroupUpcomingInvoicesProps {
  group_id: number
}

export const MyGroupUpcomingInvoices: React.FC<MyGroupUpcomingInvoicesProps> = ({
  group_id,
  ...rest
}) => {
  const [createPortalSession] = useMutation<CreateCustomerPortalSession>(
    createCustomerPortalSession
  )

  const { data } = useQuery<
    MyGroupUpcomingInvoice,
    MyGroupUpcomingInvoiceVariables
  >(myGroupUpcomingInvoice, {
    variables: { id: group_id.toString() },
  })

  const handlePortalLink = async () => {
    const { data } = await createPortalSession()

    if (data) {
      window.location.href = data.create_portal_session.url
    }
  }

  const openCreditCardModal = () => {
    const modal = new Modal(
      MyPaymentMethodWrapper,
      {
        onDone: () => {
          modal.close()
        },
      },
      {}
    )
    modal.open()
  }

  const upcoming_invoice = data?.group.upcoming_invoice
  const customer = data?.me.customer

  if (
    // You don't have an invoice coming up
    !upcoming_invoice ||
    // Or your next invoice is actually a refund
    upcoming_invoice.total <= 0 ||
    // Or you're on a free plan
    !data?.group.subscription
  )
    return null

  return (
    <Box pr={8} {...rest}>
      <Text f={2}>
        <>
          <strong>Next payment due:</strong>{' '}
          {upcoming_invoice.subtotal <= upcoming_invoice.total ? (
            `${centsToDollarsAndCents(upcoming_invoice.total)}`
          ) : (
            <span>
              <del>{`${centsToDollarsAndCents(
                upcoming_invoice.subtotal
              )}`}</del>
              {` ${centsToDollarsAndCents(upcoming_invoice.total)}`}
            </span>
          )}
          {upcoming_invoice.next_payment_attempt_at &&
            ` on ${upcoming_invoice.next_payment_attempt_at}`}{' '}
          —{' '}
          <Link onClick={handlePortalLink} mt={6}>
            View invoices
          </Link>
        </>
      </Text>

      {customer.default_payment_method &&
        customer.default_payment_method?.card && (
          <>
            <Text f={2}>
              <strong>Card on file:</strong>{' '}
              {capitalize(customer.default_payment_method?.card?.brand)} ****
              **** **** {customer.default_payment_method.card.last4} (expires{' '}
              {customer.default_payment_method.card.exp_month}/
              {customer.default_payment_method.card.exp_year}) —{' '}
              <Link onClick={openCreditCardModal}>Update default card</Link>
            </Text>
          </>
        )}
    </Box>
  )
}
