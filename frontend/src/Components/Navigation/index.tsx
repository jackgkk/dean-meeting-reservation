import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import FindDuty from '../Guest/FindDuty'
import Calendar from '../Guest/Calendar'

export default function Navigation () {
  return (
    <Router>
      <Switch>
        <Route path='/calendar'>
          <Calendar />
        </Route>
        <Route path='/find-duty'>
          <FindDuty />
        </Route>
      </Switch>
    </Router>
  )
}
