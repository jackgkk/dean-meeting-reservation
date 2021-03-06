/* eslint-disable multiline-ternary */
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core'
import { useMediaQueries } from '@react-hook/media-query'
import { values } from 'lodash'
import * as React from 'react'
import { useHistory } from 'react-router-dom'
import NavBar from '../NavBar'
import { Dean, DeanUnregistered, DeanVerifiedReg } from '../types'
import { useStyles } from './style'
import DepartmentType from '../../../Department'

export interface RegistrationProps {}

const realDepartments = [
  { name: 'Faculty of Mathematics and Computer Science', id: '0' },
  { name: 'Faculty of Biology and Environmental Protection', id: '1' },
  { name: 'The Chemistry Department', id: '2' },
  { name: 'Faculty of Economics and Sociology', id: '3' },
  { name: 'Philological Faculty', id: '4' },
  { name: 'Faculty of Philosophy and History', id: '5' },
  { name: 'Faculty of Physics and Chemistry', id: '6' },
  { name: 'Faculty of Physics and Applied Computer Science', id: '7' },
  { name: 'Faculty of Geographical Sciences', id: '8' },
  { name: 'Faculty of Educational Sciences', id: '9' },
  { name: 'Faculty of Law and Administration', id: '10' },
  { name: 'Faculty of International and Political Studies', id: '11' },
  { name: 'Faculty of Management', id: '12' }
]

const emailRegex = /^[a-zA-Z0-9._-]+@(([a-zA-Z]+\.)?)+(uni.lodz.pl)$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

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

  console.log(valid)

  return valid
}

const Registration: React.SFC<RegistrationProps> = () => {
  const [departments, setDepartments] = React.useState<Array<DepartmentType>>(
    realDepartments
  )
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
  const [sameEmail, setSameEmail] = React.useState<Boolean>(false)

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
      case 'password':
        formErrors.password =
          passwordRegex.test(value) && values.length > 0
            ? ''
            : 'Your password must contain at least 8 characters, and at least at least one uppercase letter, one lowercase letter and one number'
        if (newDean.passwordCheck.length > 0) {
          formErrors.passwordCheck =
            value === newDean.passwordCheck ? '' : 'Passwords should match'
        }
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
    if (formValid(newDean)) {
      const regDean = new DeanVerifiedReg(
        newDean.name,
        newDean.surname,
        newDean.email,
        newDean.password,
        newDean.department.name
      )

      console.log(regDean)

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
      setSameEmail(false)
      console.log(response)
      handleLogIn()
    } else {
      console.log('asgasg')
      console.log(response)
      setSameEmail(true)
    }
  }

  function handleDepChange (event: React.ChangeEvent<{ value: unknown }>) {
    const desiredDep = departments.find((dep) => event.target.value === dep.id)
    setNewDean({ ...newDean, department: desiredDep! })
  }

  const history = useHistory()

  function handleLogIn () {
    const path = '/signin'
    history.push(path)
  }

  const styling = useStyles()

  const { matches, matchesAny, matchesAll } = useMediaQueries({
    screen: 'screen',
    width: '(max-width: 992px)'
  })

  function handleAsGuest () {
    const path = '/find-duty'
    history.push(path)
  }

  return (
    <div style={{ width: '100%' }}>
      <div className={styling.mainContentContainer}>
        <div className={styling.signUpContainer}>
          <div className={styling.circle}></div>
          <div className={styling.header}>
            {!matches.width && (
              <Button
                className={styling.button}
                onClick={handleLogIn}
                id="alreadyHave"
                variant="contained"
              >
                I already have an account
              </Button>
            )}
            <Typography className={styling.SignUp} variant="h2">
              Sign Up
            </Typography>
          </div>
          <div style={{ width: '100%' }}>
            {sameEmail && (
              <div className={styling.responseErrorDiv}>
                <Typography variant="body1">
                  Entered email is already used by another account
                </Typography>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className={styling.inputContainer}>
                <Typography className={styling.label} variant="h2">
                  First Name
                </Typography>
                <input
                  className={styling.inputForm}
                  id={isValid || newDean.name.length > 0 ? '' : 'error'}
                  type="text"
                  name="name"
                  value={newDean.name}
                  onChange={handleChange}
                />
              </div>
              <div className={styling.inputContainer}>
                <Typography className={styling.label} variant="h2">
                  Last Name
                </Typography>
                <input
                  className={styling.inputForm}
                  id={isValid || newDean.surname.length > 0 ? '' : 'error'}
                  type="text"
                  name="surname"
                  value={newDean.surname}
                  onChange={handleChange}
                />
              </div>
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
                <Typography
                  className={styling.label}
                  id="password"
                  variant="h2"
                >
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
              </div>
              <div className={styling.inputContainer}>
                <Typography className={styling.label} variant="h2">
                  Repeat Password
                </Typography>
                <div>
                  <input
                    className={styling.inputForm}
                    id={
                      (!isValid && newDean.passwordCheck.length === 0) ||
                      (!isValid && newDean.errorStack.passwordCheck.length > 0)
                        ? 'error'
                        : ''
                    }
                    type="password"
                    name="passwordCheck"
                    value={newDean.passwordCheck}
                    onChange={handleChange}
                  />
                  {newDean.errorStack.passwordCheck.length > 0 && (
                    <Typography
                      style={{ padding: '0.1rem 0.5rem', color: '#E5231B' }}
                      variant="subtitle1"
                    >
                      {newDean.errorStack.passwordCheck}
                    </Typography>
                  )}
                </div>
              </div>
              <div className={styling.inputContainer}>
                <Typography className={styling.label} variant="h2">
                  Department
                </Typography>
                <Select
                  className={
                    isValid || newDean.department.name.length > 0
                      ? styling.inputForm
                      : styling.errorTemp
                  }
                  value={newDean.department.id}
                  onChange={handleDepChange}
                  id="deparmentDropDown"
                >
                  {departments.map((dep) => {
                    return (
                      <MenuItem key={dep.id} value={dep.id}>
                        {dep.name}
                      </MenuItem>
                    )
                  })}
                </Select>
              </div>
              <div className={styling.buttonsDiv}>
                {matches.width && (
                  <Button
                    className={styling.button}
                    onClick={handleLogIn}
                    id="alreadyHave"
                    variant="contained"
                  >
                    I arleady have an account
                  </Button>
                )}
                <Button
                  className={styling.button}
                  variant="outlined"
                  type="submit"
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
          {matches.width && (
            <Typography
              onClick={handleAsGuest}
              style={{ cursor: 'pointer' }}
              variant="subtitle1"
            >
              Continue as a guest
            </Typography>
          )}
        </div>
      </div>
    </div>
  )
}

export default Registration
