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
import Typography from '@material-ui/core/Typography'

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
  const [isFormOpen, setIsFormOpen] = useRecoilState(showMeetingFormState)
  const [submittingStatus, setSubmittingStatus] = useRecoilState(submittingStatusState)

  function closeForm () {
    setIsFormOpen(false)
  }

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
      <Card style={{ padding: '.25rem 1rem 1rem', boxShadow: '0px 15px 64px rgb(0 0 0 / 26%)' }}>
        <Typography variant={'h1'} style={{ padding: '1rem' }}>
          Find Dean&apos;s duty by department
        </Typography>
        {departments.map(dep => <Department key={dep.id} department={dep} />)}
      </Card>
      {isFormOpen && <MeetingForm isOpen={isFormOpen} onClose={closeForm}/>}
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
