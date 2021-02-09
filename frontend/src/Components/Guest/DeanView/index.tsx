import React, { useEffect, useState } from 'react'
import Calendar from '../Calendar'
import MeetingSuggestions from '../Meeting Suggestions'
import { InputMeetingType as MeetingType, Meeting as NewMeetingType } from '../types'
import { fakeMeetings } from '../Data'
import { Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

export default function DeanView () {
  const [meetings, setMeetings] = React.useState<Array<MeetingType>>(
    fakeMeetings
  )

  useEffect(fetchMeetingPropositions, [])

  function fetchMeetingPropositions () {
    const authorizationToken = localStorage.getItem('token')

    if (!authorizationToken) { throw new Error('User not authenticated') }

    fetch('/api/dean/calendar/get-confirmed-meetings', {
      headers: { Authorization: authorizationToken }
    })
      .then(async res => {
        if (!res.ok) {
          throw new Error('Can not get propositions: ' + await res.text())
        }
        return await res.json()
      }).then(meetings => {
        setMeetings(meetings)
      })
      .catch(({ message }) => {
        console.error('Can not get propositions: ' + message)
      })
  }

  const [propositionActionResult, setPropositionActionResult] = useState('')

  const meetingsToGroupByDate = meetings?.map((meeting) => {
    return new NewMeetingType(meeting)
  })

  function acceptHandler (id: string) {
    const authorizationToken = localStorage.getItem('token')

    if (!authorizationToken) { throw new Error('User not authenticated') }

    fetch(`/api/dean/accept-meeting/${id}`, {
      headers: { Authorization: authorizationToken }
    }).then(async res => {
      if (!res.ok) {
        throw new Error('Cannot accept meeting: ' + await res.text())
      }
    }).then(() => {
      setPropositionActionResult('Meeting accepted. Guest will be notified')
      const index = meetings.findIndex((met) => met.id === id)
      const items = [...meetings]
      items[index] = { ...items[index], accepted: true }
      setMeetings(items)
    }).catch(({ message }) => {
      setPropositionActionResult(message)
    })
  }

  function cancelHandler (id: string) {
    const authorizationToken = localStorage.getItem('token')

    if (!authorizationToken) { throw new Error('User not authenticated') }

    fetch(`/api/dean/reject-meeting/${id}`, {
      headers: { Authorization: authorizationToken }
    }).then(async res => {
      if (!res.ok) {
        throw new Error('Cannot reject meeting. ' + await res.text())
      }
    }).then(() => {
      setPropositionActionResult('Meeting rejected. Guest will be notified')
      const index = meetings.findIndex((met) => met.id === id)
      const items = [...meetings]
      items[index] = { ...items[index], accepted: true }
      setMeetings(items)
    }).catch(({ message }) => {
      setPropositionActionResult(message)
    })
  }

  function changeHandler (id: string, beginsAt: Date, duration: number) {

  }

  function handleCloseSnackbar () {
    setPropositionActionResult('')
  }

  return (
    <div>
      <MeetingSuggestions
        meetings={meetingsToGroupByDate}
        acceptHandler={acceptHandler}
        cancelHandler={cancelHandler}
        changeHandler={changeHandler}
      />
      <Calendar meetings={meetingsToGroupByDate} />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={propositionActionResult !== ''}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={propositionActionResult}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit">
              <CloseIcon fontSize="small" onClick={handleCloseSnackbar} />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  )
}
