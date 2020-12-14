import * as React from 'react'
import Calendar from '../Calendar'
import MeetingSuggestions from '../Meeting Suggestions'
import { currentDate as CurrentDateType, Meeting as MeetingType } from '../types'
import { fakeMeetings } from '../Data'

export default function DeanView () {
  const [meetings, setMeetings] = React.useState<Array<MeetingType>>(fakeMeetings)

  function acceptHandler (id: string) {
    const index = meetings.findIndex(met => met.id === id)
    const items = [...meetings]
    const item = { ...items[index], isAccepted: true }
    items[index] = item
    setMeetings(items)
  }

  function cancelHandler (id: string) {
    const index = meetings.findIndex(met => met.id === id)
    const items = [...meetings]
    items.splice(index, 1)
    setMeetings(items)
  }

  return (
        <div>
            <MeetingSuggestions meetings={meetings} acceptHandler={acceptHandler} cancelHandler={cancelHandler} />
            <Calendar meetings={meetings} />
        </div>
  )
}
