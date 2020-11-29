import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import makeStyles from '@material-ui/core/styles/makeStyles'
import DepartmentType from '../../../Department'
import Department from './Department'
import MeetingForm from '../MeetingForm'
import { atom, useRecoilState } from 'recoil'
import { meetingForm, showMeetingFormState, submittingStatusState } from './state'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Snackbar from '@material-ui/core/Snackbar'

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
  const [isFormOpen] = useRecoilState(showMeetingFormState)
  const meetingState = useRecoilState(meetingForm)[0]
  const [submittingStatus, setSubmittingStatus] = useRecoilState(submittingStatusState)

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

  function closeSnackbar () {
    setSubmittingStatus('ready')
  }

  return (
    <section className={styles.root}>
      <h1>Find Dean&apos;s duty by department</h1>
      <Card style={{ boxShadow: '0 0 2rem rgb(130, 130, 130)' }}>
        {departments.map(dep => <Department key={dep.id} department={dep} />)}
      </Card>
      {isFormOpen && <MeetingForm />}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={submittingStatus === 'success'}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message="Success! Now, check your email"
        action={
          <React.Fragment>
            <IconButton
              size="small" color="inherit"
              onClick={closeSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </section>
  )
};
