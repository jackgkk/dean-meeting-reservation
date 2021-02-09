import * as React from 'react'
import {
  currentDate as CurrentDateType,
  Meeting as MeetingType
} from '../../types'

import { v4 as _id } from 'uuid'
import Meeting from './Meeting'

interface MeetingProps {
  meetings: Array<MeetingType> | undefined
  date: Date
}

export default function MeetingList ({ meetings, date }: MeetingProps) {
  return (
    <div className="MeetingListDiv">
      {meetings
        ?.filter(
          (person) =>
            person.accepted === true &&
            person.beginsAt.getDate() === date.getDate() &&
            person.beginsAt.getMonth() === date.getMonth() &&
            person.beginsAt.getFullYear() === date.getFullYear()
        )
        .sort((a, b) => (a.date > b.date ? 1 : -1))
        .map((filteredPerson) => (
          <div key={filteredPerson.id}>
            <Meeting meeting={filteredPerson} />
          </div>
        ))}
    </div>
  )
}
