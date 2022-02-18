import React, { useCallback } from 'react'

import mapErrors from 'v2/util/mapErrors'

import Box from 'v2/components/UI/Box'
import Alert from 'v2/components/UI/Alert'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import PremiumAlert from 'v2/components/Billing/components/MyGroups/components/PremiumAlert'
import MyGroupHeader from 'v2/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupHeader'
import UpgradeSelection from 'v2/components/Billing/components/MyGroups/components/MyGroup/components/UpgradeSelection'
import MyGroupCheckout from 'v2/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupCheckout'
import CreditCard from 'v2/components/Billing/components/CreditCard'
import { LabelledInput, Label } from 'v2/components/UI/Inputs'
import { MyGroupCheckout as MyGroupCheckoutType } from '__generated__/MyGroupCheckout'
import { MyGroups_groups, MyGroups_groups_users } from '__generated__/MyGroups'
import useMergeState from 'v2/hooks/useMergeState'
import { SupportedPlanEnum } from '__generated__/globalTypes'

interface MyGroupProps {
  me: MyGroupCheckoutType
  group: MyGroups_groups
}

interface MyGroupState {
  mode: 'resting' | 'upgrading' | 'subscribed' | 'canceled' | 'error'
  errorMessage?: null
  selectedPlan?: 'basic' | SupportedPlanEnum
  upgradeableUsers?: MyGroups_groups_users[]
}

export const MyGroup: React.FC<MyGroupProps> = ({ me, group, ...rest }) => {
  const [state, setState] = useMergeState<MyGroupState>({
    mode: 'resting',
    selectedPlan: group.subscription
      ? (group.subscription.plan.id as SupportedPlanEnum)
      : 'basic',
    upgradeableUsers: group.subscription
      ? []
      : [...group.users].filter(user => user.is_upgradeable),
  })

  const { mode, selectedPlan, upgradeableUsers, errorMessage } = state

  const onAlertClose = useCallback(() => {
    setState({ mode: 'resting' })
  }, [setState])

  const handleErrors = useCallback(
    err => {
      setState({
        mode: 'error',
        ...mapErrors(err),
      })
    },
    [setState]
  )

  const handleSubscribed = useCallback(() => {
    setState({
      mode: 'subscribed',
      upgradeableUsers: [],
    })

    setTimeout(() => {
      setState({ mode: 'resting' })
    }, 5000)
  }, [setState])

  const handleCanceled = useCallback(() => {
    setState(prevState => ({
      mode: 'canceled',
      selectedPlan: !group.subscription
        ? // If the whole subscription winds up cancelling
          // reset the plan to `basic`
          'basic'
        : prevState.selectedPlan,
    }))

    setTimeout(() => {
      setState({ mode: 'resting' })
    }, 5000)
  }, [setState])

  const selectPlan = useCallback(
    selectedPlan => {
      setState({ selectedPlan })
    },
    [setState]
  )

  const addUser = useCallback(
    user => {
      return setState({
        upgradeableUsers: [...upgradeableUsers, user],
      })
    },
    [upgradeableUsers, setState]
  )

  const removeUser = useCallback(
    user => {
      console.log('removeUser', { user })
      const nextUpgradeableUsers = upgradeableUsers.filter(
        upgradeableUser => upgradeableUser.id !== user.id
      )

      return setState({ upgradeableUsers: nextUpgradeableUsers })
    },
    [upgradeableUsers, setState]
  )

  return (
    <Box {...rest}>
      <MyGroupHeader mb={7} group={group} onCanceled={handleCanceled} />

      {mode === 'subscribed' && (
        <Alert my={6} bg="state.premium" color="white" onClose={onAlertClose}>
          Subscribed! You’re all set!
        </Alert>
      )}

      {mode === 'canceled' && (
        <Alert
          my={6}
          bg="state.alert"
          color="white"
          border="none"
          onClose={onAlertClose}
        >
          Premium subscription(s) canceled.
        </Alert>
      )}

      {mode === 'error' && (
        <ErrorAlert my={6} isReloadable={false}>
          {errorMessage}
        </ErrorAlert>
      )}

      {group.is_upgradeable ? (
        <div>
          <UpgradeSelection
            key={`upgrade-${selectedPlan}`}
            group={group}
            selectedPlan={selectedPlan}
            upgradeableUsers={upgradeableUsers}
            onSelect={selectPlan}
            onAddUser={addUser}
            onRemoveUser={removeUser}
          />

          <MyGroupCheckout
            key={`checkout-${selectedPlan}-${upgradeableUsers.length}`}
            me={me}
            group={group}
            selectedPlan={selectedPlan}
            upgradeableUsers={upgradeableUsers}
            onSubscribed={handleSubscribed}
            onError={handleErrors}
          />
        </div>
      ) : (
        <>
          <PremiumAlert>Everyone in your group has Premium ;-)</PremiumAlert>
          {selectedPlan !== 'basic' && (
            <LabelledInput>
              <Label>Billed to</Label>

              <CreditCard customer={me.customer} />
            </LabelledInput>
          )}
        </>
      )}
    </Box>
  )
}

export default MyGroup
