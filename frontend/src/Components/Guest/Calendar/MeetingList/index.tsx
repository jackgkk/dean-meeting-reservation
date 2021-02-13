import * as React from 'react'
import {
  currentDate as CurrentDateType,
  Meeting as MeetingType
} from '../../types'

import { v4 as _id } from 'uuid'
import Meeting from './Meeting'

interface MeetingProps {
  meetings: Array<MeetingType> | undefined
}

export default function MeetingList ({ meetings }: MeetingProps) {
  return (
    <div className="MeetingListDiv">
      {meetings
        ?.sort((a, b) => (a.beginsAt > b.beginsAt ? 1 : -1))
        .map((filteredPerson) => (
          <div key={filteredPerson.id}>
            <Meeting meeting={filteredPerson} />
          </div>
        ))}
    </div>
  )
}
