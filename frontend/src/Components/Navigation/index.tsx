import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { v4 as _id } from 'uuid'
import DeanView from '../Guest/Dean View'
import FindDuty from '../Guest/FindDuty'
import MeetingConfirmation from '../Guest/MeetingConfirmation'

export default function Navigation () {
  return (
    <Router>
      <Switch>
        <Route path='/calendar'>
          <DeanView/>
        </Route>
        <Route path='/confirm-meeting/:token'>
          <MeetingConfirmation />
        </Route>
        <Route path='/find-duty'>
          <FindDuty />
        </Route>
      </Switch>
    </Router>

  )
}
