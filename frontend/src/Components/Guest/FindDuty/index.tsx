import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Department as DepartmentType } from './types'
import Department from './Department'

const fakeDepartments = [
  { name: 'Computer science and mathematics', id: 'k342bjh23y4u2y' },
  { name: 'Biology', id: '09jdsfiu898ds' }
]

const useStyles = makeStyles({
  root: {
    maxWidth: '48rem',
    width: '100%'
  }
})

export default function FindDuty () {
  const styles = useStyles()
  const [departments, setDepartments] = useState<Array<DepartmentType>>(fakeDepartments)

  useEffect(getDepartments, [])

  function getDepartments () {
    fetch('/api/departments/all')
      .then(handleResponse)
      .then(setDepartments)
      .catch(handleError)

    function handleResponse (res: Response) {
      if (res.ok) {
        return res.json() as Promise<Array<DepartmentType>>
      } else {
        throw new Error(`Error while fetching departments: Request ended with: ${res.status}`)
      }
    }

    function handleError ({ message }: Error) {
      console.error(message)
    }
  }

  return (
    <section className={styles.root}>
      <h1>Find Dean&apos;s duty by department</h1>
      <Card style={{ boxShadow: '0 0 2rem rgb(130, 130, 130)' }}>
        {departments.map(dep => <Department key={dep.id} department={dep} />)}
      </Card>
    </section>
  )
};