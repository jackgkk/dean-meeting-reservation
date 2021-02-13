/* eslint-disable multiline-ternary */
import * as React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
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
import HomePage from '../Guest/homePage'
import { Dean } from '../Guest/types'
import MeetingChangesRejection from '../Guest/MeetingChangesRejection'

export default function Navigation () {
  const [isLogedIn, setIsLogedIn] = React.useState<Boolean>(false)
  function handleLogInStatus (value: Boolean) {
    setIsLogedIn(value)
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          {isLogedIn ? <Redirect to="/dashboard" /> : <HomePage />}
        </Route>
        <Route path="/dashboard">
          {isLogedIn ? (
            <div style={{ width: '100%' }}>
              <NavBar auth={true} handleLogInStatus={handleLogInStatus} />
              <DeanView />
            </div>
          ) : (
            <Redirect to="/signin" />
          )}
        </Route>
        <Route path="/registration">
          {isLogedIn ? (
            <Redirect to="/dashboard" />
          ) : (
            <div style={{ width: '100%' }}>
              <Registration />
            </div>
          )}
        </Route>
        <Route path="/signin">
          {isLogedIn ? (
            <Redirect to="/dashboard" />
          ) : (
            <div style={{ width: '100%' }}>
              <SignIn handleLogInStatus={handleLogInStatus} />
            </div>
          )}
        </Route>
        <Route path="/confirm-meeting/:token">
          <MeetingConfirmation />
        </Route>
        <Route path="/reject-meeting-changes/:token">
          <MeetingChangesRejection />
        </Route>
        <Route path="/find-duty">
          <div>
            {/* <NavBar auth={isLogedIn} handleLogInStatus={handleLogInStatus} /> */}
            <FindDuty />
          </div>
        </Route>
      </Switch>
    </Router>
  )
}
