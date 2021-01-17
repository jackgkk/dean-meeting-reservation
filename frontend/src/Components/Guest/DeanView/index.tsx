import * as React from 'react'
import Calendar from '../Calendar'
import MeetingSuggestions from '../Meeting Suggestions'
import {
  currentDate as CurrentDateType,
  InputMeetingType as MeetingType,
  Meeting as NewMeetingType
} from '../types'
import { fakeMeetings } from '../Data'

export default function DeanView () {
  const [meetings, setMeetings] = React.useState<Array<MeetingType>>(
    fakeMeetings
  )

  const meetingsToGroupByDate = meetings?.map((meeting) => {
    return new NewMeetingType(meeting)
  })

  function acceptHandler (id: string) {
    const index = meetings.findIndex((met) => met.id === id)
    const items = [...meetings]

    const authToken = localStorage.getItem('token')

    if (!authToken) throw new Error('User not authenticated')

    fetch('/api/dean/calendar/get-confirmed-meetings/' + index, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken
      }
    }).then(res => {
      if (!res.ok) {
        throw new Error('meeting can not be confirmed: ' + res.text())
      }
    })
      .then(() => {
        // setPropositionActionResult('Meeting confirmed')
        const item = { ...items[index], isAccepted: true}
        items[index] = item
        setMeetings(items)
      }).catch(({message}) => {
      // setPropositionActionResult(message)
    })
  }

  function cancelHandler (id: string) {
    const index = meetings.findIndex((met) => met.id === id)
    const items = [...meetings]
    const authToken = localStorage.getItem('token')

    if (!authToken) {
      throw new Error('User not authenticated')
    }

    fetch('/api/dean/calendar/cancel-meeting/' + index, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken
      },
      body: null
    }).then(res => { if (!res.ok) { throw new Error('meeting can not be canceled: ' + res.text()) } })
      .then(() => {
        // setPropositionActionResult('Meeting accepted')
        items.splice(index, 1)
        setMeetings(items)
      }).catch(({message}) => {
      // setPropositionActionResult(message)
      })
  }

  return (
    <div>
      <MeetingSuggestions
        meetings={meetingsToGroupByDate}
        acceptHandler={acceptHandler}
        cancelHandler={cancelHandler}
      />
      <Calendar meetings={meetingsToGroupByDate} />
    </div>
  )
}
