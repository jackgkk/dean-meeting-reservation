import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DeanView from '../Guest/DeanView'
import { v4 as _id } from 'uuid'
import FindDuty from '../Guest/FindDuty'
import MeetingConfirmation from '../Guest/MeetingConfirmation'
import Registration from '../Guest/Registration'

export default function Navigation () {
  return (
    <Router>
      <Switch>
        <Route path='/calendar'>
          <DeanView />
        </Route>
        <Route path='/registration'>
          <Registration/>
        </Route>
        <Route path='/confirm-meeting/:token'>
          <MeetingConfirmation />
        </Route>
      </Switch>
    </Router>

  )
}
