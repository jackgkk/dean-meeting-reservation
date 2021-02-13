import { Button, Typography } from '@material-ui/core'
import * as React from 'react'
import { useStyles } from './style'
import image from './image/Management.svg'
import { useHistory } from 'react-router-dom'

export default function HomePage () {
  const style = useStyles()
  const history = useHistory()

  function handleAsGuest () {
    const path = '/find-duty'
    history.push(path)
  }
  function handleLogIn () {
    const path = '/signin'
    history.push(path)
  }
  return (
    <div className={style.body}>
      <div className={style.contentCont}>
        <div className={style.textCont}>
          <Typography variant="h4">
            Bring your meeting managment to the next level
          </Typography>
          <Typography variant="h5" style={{ marginTop: '-3rem' }}>
            Easily manage your office hour meetings and avoid queues and email
            mess requesting a meeting through the app
          </Typography>
          <div className={style.buttonDiv}>
            <Button
              className={style.button}
              variant="contained"
              type="submit"
              onClick={handleLogIn}
            >
              Log In as a Dean
            </Button>
            <Button
              className={style.button}
              id="alreadyHave"
              variant="contained"
              type="submit"
              onClick={handleAsGuest}
            >
              Guest
            </Button>
          </div>
        </div>
        <div className={style.imgCont}>
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  )
}
