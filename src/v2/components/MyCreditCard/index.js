import React, { PureComponent } from 'react'
import { graphql } from '@apollo/client/react/hoc'
import { Query } from '@apollo/client/react/components'
import PropTypes from 'prop-types'
import compose from 'lodash.flowright'
import { injectStripe } from 'react-stripe-elements'

import myCreditCardQuery from 'v2/components/MyCreditCard/queries/myCreditCard'

import addCreditCardMutation from 'v2/components/MyCreditCard/mutations/addCreditCard'
import changeDefaultCreditCardMutation from 'v2/components/MyCreditCard/mutations/changeDefaultCreditCard'

import mapErrors from 'v2/util/mapErrors'

import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import TitledDialog from 'v2/components/UI/TitledDialog'
import DefaultCreditCard from 'v2/components/MyCreditCard/components/DefaultCreditCard'
import NewCreditCardForm from 'v2/components/MyCreditCard/components/NewCreditCardForm'
import ManageMyCreditCards from 'v2/components/MyCreditCard/components/ManageMyCreditCards'

class MyCreditCard extends PureComponent {
  static propTypes = {
    stripe: PropTypes.shape({
      createToken: PropTypes.func.isRequired,
    }).isRequired,
    addCreditCard: PropTypes.func.isRequired,
    changeDefaultCreditCard: PropTypes.func.isRequired,
    onDone: PropTypes.func,
    page: PropTypes.oneOf(['default', 'new', 'manage']),
  }

  static defaultProps = {
    onDone: () => {},
    page: 'default',
  }

  state = {
    mode: 'resting',
    page: this.props.page,
    errorMessage: null,
    default_credit_card_id: null,
  }

  navigate = page => e => {
    if (e) e.preventDefault()
    this.setState({ page })
  }

  handleErrors = err => {
    this.setState({
      mode: 'error',
      ...mapErrors(err),
    })
  }

  addCreditCard = () => {
    const { stripe, addCreditCard } = this.props

    return stripe.createToken({ type: 'card' }).then(({ error, token }) => {
      if (error) {
        return Promise.reject(error)
      }

      return addCreditCard({
        variables: {
          token: token.id,
        },
      })
    })
  }

  changeDefaultCreditCard = () => {
    const { changeDefaultCreditCard } = this.props
    const { default_credit_card_id } = this.state

    if (!default_credit_card_id) return Promise.resolve()

    return changeDefaultCreditCard({
      variables: { default_credit_card_id },
    })
  }

  handleChangeDefaultCreditCard = default_credit_card_id =>
    this.setState({ default_credit_card_id })

  handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()

    const { page } = this.state
    const { onDone } = this.props

    if (page === 'default') {
      return onDone()
    }

    const mutation = {
      new: this.addCreditCard,
      manage: this.changeDefaultCreditCard,
    }[page]

    this.setState({ mode: 'saving' })

    return mutation()
      .then(() => onDone())
      .catch(this.handleErrors)
  }

  render() {
    const { page, mode, errorMessage } = this.state

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
        onDone={this.handleSubmit}
      >
        <Query query={myCreditCardQuery}>
          {({ loading, error, data }) => {
            if (loading) return <LoadingIndicator />
            if (error) {
              return <ErrorAlert>{error.message}</ErrorAlert>
            }

            const {
              me: {
                customer,
                customer: { credit_cards, default_credit_card },
              },
            } = data

            return (
              <Box>
                {mode === 'error' && (
                  <ErrorAlert isReloadable={false}>{errorMessage}</ErrorAlert>
                )}

                {page === 'default' && (
                  <DefaultCreditCard
                    mb={6}
                    default_credit_card={default_credit_card}
                  />
                )}

                {page === 'new' && <NewCreditCardForm />}

                {page === 'manage' && (
                  <ManageMyCreditCards
                    customer={customer}
                    onChangeDefaultCreditCard={
                      this.handleChangeDefaultCreditCard
                    }
                  />
                )}

                {page !== 'new' && (
                  <Text f={1} my={6} px={6} fontWeight="bold">
                    <a
                      onClick={this.navigate('new')}
                      role="button"
                      tabIndex={0}
                    >
                      + Add new card
                    </a>
                  </Text>
                )}

                {page === 'default' && (
                  <Box my={6} px={6}>
                    {credit_cards && credit_cards.length > 1 && (
                      <Text f={1} underlineLinks>
                        <a
                          onClick={this.navigate('manage')}
                          role="button"
                          tabIndex={0}
                        >
                          Manage cards
                        </a>
                      </Text>
                    )}
                  </Box>
                )}
              </Box>
            )
          }}
        </Query>
      </TitledDialog>
    )
  }
}

export default injectStripe(
  compose(
    graphql(addCreditCardMutation, { name: 'addCreditCard' }),
    graphql(changeDefaultCreditCardMutation, {
      name: 'changeDefaultCreditCard',
    })
  )(MyCreditCard)
)
