import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory
} from 'react-router-dom'
import DeanView from '../Guest/DeanView'
import { v4 as _id } from 'uuid'
import FindDuty from '../Guest/FindDuty'
import MeetingConfirmation from '../Guest/MeetingConfirmation'
import Registration from '../Guest/Registration'
import SignIn from '../Guest/Sign In'
import NavBar from '../Guest/NavBar'
import { Dean } from '../Guest/types'

export default function Navigation () {
  const [dean, setDean] = React.useState<Dean>()

  const history = useHistory()

  function handleSuccesfullLogIn (dean: Dean) {
    setDean(dean)
    const path = '/dashboard'
    history.push(path)
  }

  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <DeanView />
        </Route>
        <Route path="/registration">
          <div style={{ width: '100%' }}>
            <NavBar auth={false} />
            <Registration />
          </div>
        </Route>
        <Route path="/signin">
          <div style={{ width: '100%' }}>
            <NavBar auth={false} />
            <SignIn handleSuccesfullLogIn={handleSuccesfullLogIn} />
          </div>
        </Route>
        <Route path="/confirm-meeting/:token">
          <MeetingConfirmation />
        </Route>
        <Route path="/find-duty">
          <FindDuty />
        </Route>
      </Switch>
    </Router>
  )
}
