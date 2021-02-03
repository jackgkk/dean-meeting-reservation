import * as React from 'react'
import Calendar from '../Calendar'
import MeetingSuggestions from '../Meeting Suggestions'
import {
  currentDate as CurrentDateType,
  Dean,
  InputMeetingType as MeetingType,
  Meeting as NewMeetingType
} from '../types'
import { fakeMeetings } from '../Data'
import DeanInfo from '../DeanInfo'
import { uniqueId } from 'lodash'

export default function DeanView () {
  const [meetings, setMeetings] = React.useState<Array<MeetingType>>(
    fakeMeetings
  )

  const [dean, setDean] = React.useState<Dean>({
    id: uniqueId.toString(),
    name: 'Yevhen',
    surname: 'Hukalo',
    email: 'gukalo2001@gmail.com',
    duties: [
      {
        dayOfWeek: 4,
        begins: '14:00',
        ends: '15.45'
      },
      {
        dayOfWeek: 1,
        begins: '11:00',
        ends: '11.45'
      }
    ],
    status: 'Dean'
  })

  const meetingsToGroupByDate = meetings?.map((meeting) => {
    return new NewMeetingType(meeting)
  })

  function acceptHandler (id: string) {
    const index = meetings.findIndex((met) => met.id === id)
    const items = [...meetings]
    const item = { ...items[index], isAccepted: true }
    items[index] = item
    setMeetings(items)
  }

  function cancelHandler (id: string) {
    const index = meetings.findIndex((met) => met.id === id)
    const items = [...meetings]
    items.splice(index, 1)
    setMeetings(items)
  }

  return (
    <div>
      <DeanInfo dean={dean} />
      <MeetingSuggestions
        meetings={meetingsToGroupByDate}
        acceptHandler={acceptHandler}
        cancelHandler={cancelHandler}
      />
      <Calendar meetings={meetingsToGroupByDate} />
    </div>
  )
}
