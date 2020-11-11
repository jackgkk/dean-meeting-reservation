import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import FindDuty from '../Guest/FindDuty'

export default function Navigation () {
  return (
    <Router>
      <Switch>
        <Route path='/find-duty'>
          <FindDuty />
        </Route>
      </Switch>
    </Router>
  )
}
