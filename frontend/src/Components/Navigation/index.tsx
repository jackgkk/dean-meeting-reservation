import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import FindDuty from '../Guest/FindDuty'
import MeetingConfirmation from '../Guest/MeetingConfirmation'

export default function Navigation () {
  return (
    <Router>
      <Switch>
        <Route path='/find-duty'>
          <FindDuty />
        </Route>
        <Route path='/confirm-meeting/:token'>
          <MeetingConfirmation />
        </Route>
      </Switch>
    </Router>
  )
}
