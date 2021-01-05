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
import { Dean, DeanUnregistered, DeanVerifiedReg } from '../types'
import { useStyles } from './style'

const emailRegex = /^[a-zA-Z0-9._-]+@(([a-zA-Z]+\.)?)+(uni.lodz.pl)$/

const formValid = (newDean: DeanUnregistered) => {
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
  const [newDean, setNewDean] = React.useState<DeanUnregistered>({
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordCheck: '',
    department: {
      id: '',
      name: ''
    },
    errorStack: {
      email: '',
      password: '',
      passwordCheck: ''
    }
  })

  const [isValid, setIsValid] = React.useState<Boolean>(true)

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
      case 'passwordCheck':
        formErrors.passwordCheck =
          value === newDean.password ? '' : 'Passwords should match'
        break
    }

    setNewDean({ ...newDean, errorStack: formErrors, [name]: value })
  }

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsValid(formValid(newDean))
    if (isValid) {
      const regDean = new DeanVerifiedReg(
        Math.random().toString(),
        newDean.name,
        newDean.surname,
        newDean.email,
        newDean.password,
        newDean.department
      )

      fetch('/api/dean/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(regDean)
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
    }
  }

  const styling = useStyles()

  return (
    <div className={styling.signUpContainer}>
      <div className={styling.header}>
        <Typography className={styling.SignUp} variant="h2">
          Log In
        </Typography>
      </div>
      <div>
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
            <div style={{ width: '32rem', display: 'block' }}>
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
          </div>
          <Button className={styling.button} variant="outlined" type="submit">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  )
}
