import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Calendar from '../Guest/Calendar'
import MeetingSuggestions from '../Guest/Meeting Suggestions'
import { currentDate as CurrentDateType, Meeting as MeetingType } from '../Guest/types'
import { v4 as _id } from 'uuid'

import { fakeMeetings } from '../Guest/Data'
import FindDuty from '../Guest/FindDuty'
import MeetingConfirmation from '../Guest/MeetingConfirmation'

export default function Navigation () {
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
    <Router>
      <Switch>
        <Route path='/calendar'>
          <MeetingSuggestions meetings={meetings} acceptHandler={acceptHandler} cancelHandler={cancelHandler} />
          <Calendar meetings={meetings} />
        </Route>
        <Route path='/confirm-meeting/:token'>
          <MeetingConfirmation />
        </Route>
        <Route path="/find-duty">
          <FindDuty />
        </Route>
      </Switch>
    </Router>

  )
}
