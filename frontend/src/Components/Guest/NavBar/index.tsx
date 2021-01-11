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

interface navbarProps {
  auth: Boolean
}

export default function NavBar (auth: navbarProps) {
  const classes = useStyles()

  function handleLogIn () {
    const history = useHistory()
    const path = '/signin'
    history.push(path)
  }
  return (
    <div>
      <AppBar position="absolute" style={{ boxShadow: 'none' }}>
        <Toolbar className={classes.root}>
          <img src={uniLodzLogo} alt="Logo of University of Lodz" />
          {auth.auth && (
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
