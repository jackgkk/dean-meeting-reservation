import { MenuItem, Select, Typography } from '@material-ui/core'
import * as React from 'react'
import { fakeMeetings } from '../Data'
import { DeanUnregistered } from '../types'

export interface RegistrationProps {

}

const fakeDepartments = [
  { name: 'Computer science and mathematics', id: 'k342bjh23y4u2y' },
  { name: 'Biology', id: '09jdsfiu898ds' }
]

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
      emailError: '',
      passwordError: '',
      passwordCheckError: ''
    }
  })

  function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    setNewDean({ ...newDean, [event.target.name]: event.target.value })
    console.log(newDean)
  }

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  function handleDepChange (event: React.ChangeEvent<{ value: unknown }>) {
    const desiredDep = fakeDepartments.find(dep => event.target.value === dep.id)
    setNewDean({ ...newDean, department: desiredDep! })
  }

  return (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="{styling.inputForm}">
              <Typography variant="h2">First Name</Typography>
              <input type="text" name="name" value={newDean.name} onChange={handleChange} formNoValidate/>
            </div>
            <div className="{styling.inputForm}">
              <Typography variant="h2">Last Name</Typography>
              <input type="text" name="surname" value={newDean.surname} onChange={handleChange} formNoValidate/>
            </div>
            <div className="{styling.inputForm}">
              <Typography variant="h2">Email</Typography>
              <input type="text" name="email" value={newDean.email} onChange={handleChange} formNoValidate/>
            </div>
            <div className="{styling.inputForm}">
              <Typography variant="h2">Password</Typography>
              <input type="text" name="password" value={newDean.password} onChange={handleChange} formNoValidate/>
            </div>
            <div className="{styling.inputForm}">
              <Typography variant="h2">Repeat Password</Typography>
              <input type="text" name="passwordCheck" value={newDean.passwordCheck} onChange={handleChange} formNoValidate/>
            </div>
            <div className="{styling.inputForm}">
              <Typography variant="h2">Department</Typography>
              <Select
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
            <button type="submit">Sign In</button>
          </form>
        </div>
  )
}

export default Registration
