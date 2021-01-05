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
      <MeetingSuggestions
        meetings={meetingsToGroupByDate}
        acceptHandler={acceptHandler}
        cancelHandler={cancelHandler}
      />
      <Calendar meetings={meetingsToGroupByDate} />
    </div>
  )
}
