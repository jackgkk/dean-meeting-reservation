/* eslint-disable multiline-ternary */
import * as React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useStyles } from './style'
import uniLodzLogo from '../../../Assets/uniLodzLogo.png'
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
interface navbarProps {
  auth: Boolean
  handleLogInStatus: (value: Boolean) => void
}

export default function NavBar ({ auth, handleLogInStatus }: navbarProps) {
  const classes = useStyles()
  const history = useHistory()

  function handleLogIn () {
    const path = '/signin'
    history.push(path)
  }

  function handleLogOut () {
    handleLogInStatus(false)
    localStorage.clear()
    handleLogIn()
  }

  function handleFindDuty () {
    const path = '/find-duty'
    history.push(path)
  }
  return (
    <div>
      <AppBar
        position="absolute"
        style={{ boxShadow: 'none', marginBottom: '60px' }}
      >
        <Toolbar className={classes.root}>
          <img
            src={uniLodzLogo}
            alt="Logo of University of Lodz"
            onClick={handleFindDuty}
          />
          {auth ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleLogOut}
                color="inherit"
              >
                <ExitToAppIcon style={{ marginRight: '0.3rem' }} />
                <Typography variant="body1">Log Out</Typography>
              </IconButton>
            </div>
          ) : (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleLogIn}
                color="inherit"
              >
                <AccountCircle style={{ marginRight: '0.3rem' }} />
                <Typography variant="body1">Log In</Typography>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
