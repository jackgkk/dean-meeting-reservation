import { Button, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import { values } from 'lodash'
import * as React from 'react'
import { fakeMeetings } from '../Data'
import { Dean, DeanUnregistered, errorStack } from '../types'
import { useStyles } from './style'

export interface RegistrationProps {

}

const fakeDepartments = [
  { name: 'Computer science and mathematics', id: 'k342bjh23y4u2y' },
  { name: 'Biology', id: '09jdsfiu898ds' }
]

const emailRegex = (/^[a-zA-Z0-9._-]+@(([a-zA-Z]+\.)?)+(uni.lodz.pl)$/)
const passwordRegex = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)

const formValid = (newDean: DeanUnregistered) => {
  let valid = true

  // validate form errors being empty
  Object.values(newDean.errorStack).forEach(val => {
    val.length > 0 && (valid = false)
  })

  // validate the form was filled out
  Object.values(newDean).forEach(val => {
    val === '' && (valid = false)
  })

  return valid
}

const Registration: React.SFC<RegistrationProps> = () => {
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

  function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const name = event.target.name

    const formErrors = { ...newDean.errorStack }

    switch (event.target.name) {
      case 'email':
        formErrors.email = emailRegex.test(value) && values.length > 0 ? '' : 'Email should be registered on University domain - uni.lodz.pl'
        break
      case 'password':
        formErrors.password = passwordRegex.test(value) && values.length > 0 ? '' : 'Your password must contain at least 8 characters, and at least at least one uppercase letter, one lowercase letter and one number'
        break
      case 'passwordCheck':
        formErrors.passwordCheck = value === newDean.password ? '' : 'Passwords should match'
        break
    }

    setNewDean({ ...newDean, errorStack: formErrors, [name]: value })
  }

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (formValid(newDean)) {
      console.log(
        '--SUBMITTING--',
        newDean
      )
    } else {
      console.error('FORM INVALID - DISPLAY ERROR MESSAGE')
    }
  }

  function handleDepChange (event: React.ChangeEvent<{ value: unknown }>) {
    const desiredDep = fakeDepartments.find(dep => event.target.value === dep.id)
    setNewDean({ ...newDean, department: desiredDep! })
  }

  const styling = useStyles()

  return (
        <div className={styling.signUpContainer}>
          <div className={styling.header}>
            <Button className={styling.button} id="alreadyHave" variant="contained">I already have an account</Button>
            <Typography className={styling.SignUp} variant="h2">Sign Up</Typography>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className={styling.inputContainer}>
                <Typography className={styling.label} variant="h2">First Name</Typography>
                <input className={styling.inputForm} type="text" name="name" value={newDean.name} onChange={handleChange}/>
              </div>
              <div className={styling.inputContainer}>
                <Typography className={styling.label} variant="h2">Last Name</Typography>
                <input className={styling.inputForm} type="text" name="surname" value={newDean.surname} onChange={handleChange} />
              </div>
              <div className={styling.inputContainer}>
                <Typography className={styling.label} variant="h2">Email</Typography>
                <div>
                  <input className={styling.inputForm} id={newDean.errorStack.email.length > 0 ? 'error' : ''} type="email" name="email" value={newDean.email} onChange={handleChange} />
                  {newDean.errorStack.email.length > 0 && (
                    <Typography style={{ padding: '0.1rem 0.5rem', color: '#E5231B' }} variant="subtitle1">{newDean.errorStack.email}</Typography>
                  )}
                </div>
              </div>
              <div className={styling.inputContainer}>
                <Typography className={styling.label} id="password" variant="h2">Password</Typography>
                <div style={{ width: '32rem', display: 'block' }}>
                  <input className={styling.inputForm} id={newDean.errorStack.password.length > 0 ? 'error' : ''} type="password" name="password" value={newDean.password} onChange={handleChange} />
                  {newDean.errorStack.password.length > 0
                    ? <Typography style={{ padding: '0.1rem 0.5rem', color: '#E5231B' }} variant="subtitle1">{newDean.errorStack.password}</Typography>
                    : <Typography style={{ padding: '0.1rem 0.5rem' }} variant="subtitle1">Your password must contain at least 8 characters, and at least at least one uppercase letter, one lowercase letter and one number</Typography>
                  }
                </div>
              </div>
              <div className={styling.inputContainer}>
                <Typography className={styling.label} variant="h2">Repeat Password</Typography>
                <div>
                  <input className={styling.inputForm} id={newDean.errorStack.passwordCheck.length > 0 ? 'error' : ''} type="password" name="passwordCheck" value={newDean.passwordCheck} onChange={handleChange} />
                  {newDean.errorStack.passwordCheck.length > 0 && (
                    <Typography style={{ padding: '0.1rem 0.5rem', color: '#E5231B' }} variant="subtitle1">{newDean.errorStack.passwordCheck}</Typography>
                  )}
                </div>
              </div>
              <div className={styling.inputContainer}>
                <Typography className={styling.label} variant="h2">Department</Typography>
                <Select
                  style = {{ width: '32rem' }}
                  className={styling.inputForm}
                  value={newDean.department.id}
                  onChange={handleDepChange}
                >
                  {fakeDepartments.map(dep => {
                    return (
                      <MenuItem key={dep.id} value={dep.id}>{dep.name}</MenuItem>
                    )
                  })}
                </Select>
              </div>
              <Button className={styling.button} variant="outlined" type="submit">Sign Up</Button>
            </form>
          </div>
        </div>
  )
}

export default Registration
