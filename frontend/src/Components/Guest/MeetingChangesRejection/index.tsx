import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'

function MeetingChangesRejection () {
  const [confirmationState, setConfirmationState] = useState<'pending'|'success'|'error'>()

  const match = useRouteMatch<{ token: string }>()

  useEffect(function rejectMeetingChanges () {
    const { token } = match.params

    console.log(token)

    fetch(`/api/meeting/reject-meeting-changes/${token}`, { method: 'DELETE' })
      .then(handleSuccessfulRejection)
      .catch(handleRejectionError)
  }, [])

  function handleSuccessfulRejection (res: Response) {
    if (res.status === 200) {
      setConfirmationState('success')
    } else {
      handleRejectionError(new Error(res.statusText))
    }
  }

  function handleRejectionError (err: Error) {
    console.warn(err.message)

    setConfirmationState('error')
  }

  const pending = <h1>Rejection in progress...</h1>
  const success = <h1>You&apos;ve rejected suggested changes.</h1>
  const error = <h1>Something went wrong</h1>

  if (confirmationState === 'success') return success
  else if (confirmationState === 'error') return error
  else return pending
}

export default MeetingChangesRejection
