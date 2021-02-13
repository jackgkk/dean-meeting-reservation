import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'

function MeetingConfirmation () {
  const [confirmationState, setConfirmationState] = useState<'pending'|'success'|'error'>()

  const match = useRouteMatch<{ token: string }>()

  useEffect(function confirmMeeting () {
    const { token } = match.params

    console.log(token)

    fetch(`/api/meeting/confirm-meeting/${token}`)
      .then(handleSuccessfulConfirmation)
      .catch(handleConfirmationError)
  }, [])

  function handleSuccessfulConfirmation (res: Response) {
    if (res.status === 202) {
      setConfirmationState('success')
    } else {
      handleConfirmationError(new Error(res.statusText))
    }
  }

  function handleConfirmationError (err: Error) {
    console.warn(err.message)

    setConfirmationState('error')
  }

  const pending = <h1>Confirmation in progress...</h1>
  const success = <h1>Meeting confirmed! Now wait for email from Dean with his acceptance.</h1>
  const error = <h1>Something went wrong</h1>

  if (confirmationState === 'success') return success
  else if (confirmationState === 'error') return error
  else return pending
}

export default MeetingConfirmation
