/* eslint-disable multiline-ternary */
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core'
import { values } from 'lodash'
import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { LogInDean, UnLogedInDean } from '../types'
import { useStyles } from './style'

const emailRegex = /^[a-zA-Z0-9._-]+@(([a-zA-Z]+\.)?)+(uni.lodz.pl)$/

const formValid = (newDean: UnLogedInDean) => {
  let valid = true

  // validate form errors being empty
  Object.values(newDean.errorStack).forEach((val) => {
    val.length > 0 && (valid = false)
  })
  // validate the form was filled out
  Object.values(newDean).forEach((val) => {
    val === '' && (valid = false)
  })

  return valid
}

export default function SignIn () {
  const [newDean, setNewDean] = React.useState<UnLogedInDean>({
    email: '',
    password: '',
    errorStack: {
      email: '',
      password: '',
      passwordCheck: ''
    }
  })

  const [isValid, setIsValid] = React.useState<Boolean>(true)
  const [isLogedIn, setIsLogedIn] = React.useState<Boolean>(true)

  const history = useHistory()

  function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const name = event.target.name
    const formErrors = { ...newDean.errorStack }

    switch (name) {
      case 'email':
        formErrors.email =
          emailRegex.test(value) && values.length > 0
            ? ''
            : 'Email should be registered on University domain - uni.lodz.pl'
        break
    }

    setNewDean({ ...newDean, errorStack: formErrors, [name]: value })
  }

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsValid(formValid(newDean))
    if (formValid(newDean)) {
      const logInDean = new LogInDean(newDean.email, newDean.password)

      fetch('/api/dean/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(logInDean)
      })
        .then(handleSuccessfulSubmit)
        .catch(console.warn)
    } else {
      console.error('FORM INVALID - DISPLAY ERROR MESSAGE')
    }
  }

  function handleSuccessfulSubmit (response: Response) {
    if (response.status === 200) {
      console.log(response)
    } else {
      setIsLogedIn(false)
    }
  }
  function handleRegistr () {
    const path = '/registration'
    history.push(path)
  }

  function handleAsGuest () {
    const path = '/find-duty'
    history.push(path)
  }

  const styling = useStyles()
  return (
    <div className={styling.mainContentContainer}>
      <div className={styling.signUpContainer}>
        <div className={styling.circle}></div>
        <div className={styling.header}>
          <Typography className={styling.SignUp} variant="h2">
            Log In
          </Typography>
        </div>
        <div style={{ width: '100%' }}>
          {!isLogedIn && (
            <div className={styling.responseErrorDiv}>
              <Typography variant="body1">
                Entered email or password is wrong.
              </Typography>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className={styling.inputContainer}>
              <Typography className={styling.label} variant="h2">
                Email
              </Typography>
              <div>
                <input
                  className={styling.inputForm}
                  id={
                    (!isValid && newDean.email.length === 0) ||
                    (!isValid && newDean.errorStack.email.length > 0)
                      ? 'error'
                      : ''
                  }
                  type="email"
                  name="email"
                  value={newDean.email}
                  onChange={handleChange}
                />
                {newDean.errorStack.email.length > 0 && (
                  <Typography
                    style={{ padding: '0.1rem 0.5rem', color: '#E5231B' }}
                    variant="subtitle1"
                  >
                    {newDean.errorStack.email}
                  </Typography>
                )}
              </div>
            </div>
            <div className={styling.inputContainer}>
              <Typography className={styling.label} id="password" variant="h2">
                Password
              </Typography>
              <div>
                <input
                  className={styling.inputForm}
                  id={
                    (!isValid && newDean.password.length === 0) ||
                    (!isValid && newDean.errorStack.password.length > 0)
                      ? 'error'
                      : ''
                  }
                  type="password"
                  name="password"
                  value={newDean.password}
                  onChange={handleChange}
                />
                {!isValid && newDean.errorStack.password.length > 0 ? (
                  <Typography
                    style={{ padding: '0.1rem 0.5rem', color: '#E5231B' }}
                    variant="subtitle1"
                  >
                    {newDean.errorStack.password}
                  </Typography>
                ) : (
                  <Typography
                    style={{ padding: '0.1rem 0.5rem' }}
                    variant="subtitle1"
                  >
                    {newDean.errorStack.password}
                  </Typography>
                )}
              </div>
              <Typography variant="subtitle1" id="forgotPass">
                I Forgot My Password
              </Typography>
            </div>
            <div className={styling.buttonsDiv}>
              <Button
                onClick={handleRegistr}
                className={styling.button}
                variant="outlined"
              >
                Sign Up
              </Button>
              <Button
                className={styling.button}
                id="alreadyHave"
                variant="contained"
                type="submit"
              >
                Log In
              </Button>
            </div>
          </form>
        </div>
        <Typography
          onClick={handleAsGuest}
          style={{ cursor: 'pointer', paddingTop: '1rem' }}
          variant="subtitle1"
        >
          Continue as a guest
        </Typography>
      </div>
    </div>
  )
}
