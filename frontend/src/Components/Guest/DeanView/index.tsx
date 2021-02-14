/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import Calendar from '../Calendar'
import MeetingSuggestions from '../Meeting Suggestions'
import {
  Dean,
  Duty,
  InputMeetingType as MeetingType,
  Meeting as NewMeetingType
} from '../types'
import { fakeMeetings } from '../Data'
import { Breadcrumbs, Link, Snackbar } from '@material-ui/core'
import { emphasize, withStyles, Theme } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import DeanInfo from '../DeanInfo'
import { uniqueId } from 'lodash'
import NavBar from '../NavBar'
import { useStyles } from './style'
import { de } from 'date-fns/locale'
import { useMediaQueries } from '@react-hook/media-query'

const StyledBreadcrumb = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'transparent',
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: '#E5231B',
      color: 'white'
    },
    '&:active': {
      boxShadow: theme.shadows[1]
    }
  }
}))(Chip) as typeof Chip

export default function DeanView () {
  const [meetings, setMeetings] = React.useState<Array<MeetingType>>([])
  const [dean, setDean] = React.useState<Dean>({
    id: uniqueId.toString(),
    name: '',
    surname: '',
    email: '',
    duties: [new Duty(0, '', '')],
    status: 'Dean'
  })

  const [actionResult, setActionResult] = useState('')

  const meetingsToGroupByDate = meetings?.map((meeting) => {
    return new NewMeetingType(meeting)
  })

  useEffect(fetchMeetingPropositions, [])
  useEffect(fetchDeanInfo, [])

  function fetchMeetingPropositions () {
    const authorizationToken = localStorage.getItem('token')
    console.log('local', localStorage)
    console.log('tok', authorizationToken)

    if (!authorizationToken) {
      throw new Error('User not authenticated ggg')
    }

    fetch('/api/dean/calendar/get-confirmed-meetings', {
      headers: { Authorization: authorizationToken }
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Can not get propositions: ' + (await res.text()))
        }
        return await res.json()
      })
      .then((meetings) => {
        setMeetings(meetings)
      })
      .catch(({ message }) => {
        console.error('Can not get propositions: ' + message)
      })
  }

  function fetchDeanInfo () {
    const authorizationToken = localStorage.getItem('token')

    if (!authorizationToken) {
      throw new Error('User not authenticated www')
    }

    fetch('/api/dean', {
      headers: { Authorization: authorizationToken }
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Can not get Dean info: ' + (await res.text()))
        }

        return await res.json()
      })
      .then(setDean)
      .catch(({ message }) => {
        console.error('Can not get Dean info: ' + message)
      })
  }

  function updateOfficeHours (officeHours: Array<Duty>) {
    const authorizationToken = localStorage.getItem('token')

    if (!authorizationToken) {
      throw new Error('User not authenticated')
    }

    fetch('/api/dean/update-info', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorizationToken
      },
      body: JSON.stringify({ duties: officeHours })
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Can not update office hours: ' + (await res.text()))
        }

        setActionResult('Office hours was successfully updated!')
        fetchDeanInfo()

        return await res.json()
      })
      .catch(({ message }) => {
        console.error('Can not update office hours: ' + message)
      })
  }

  function acceptHandler (id: string) {
    const authorizationToken = localStorage.getItem('token')

    if (!authorizationToken) {
      throw new Error('User not authenticated')
    }

    fetch(`/api/dean/accept-meeting/${id}`, {
      headers: { Authorization: authorizationToken }
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Cannot accept meeting: ' + (await res.text()))
        }
      })
      .then(() => {
        setActionResult('Meeting accepted. Guest will be notified')
        const index = meetings.findIndex((met) => met.id === id)
        const items = [...meetings]
        items[index] = { ...items[index], accepted: true }
        setMeetings(items)
      })
      .catch(({ message }) => {
        setActionResult(message)
      })
  }

  function cancelHandler (id: string) {
    const authorizationToken = localStorage.getItem('token')

    if (!authorizationToken) {
      throw new Error('User not authenticated')
    }

    fetch(`/api/dean/reject-meeting/${id}`, {
      headers: { Authorization: authorizationToken }
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Cannot reject meeting. ' + (await res.text()))
        }
      })
      .then(() => {
        setActionResult('Meeting rejected. Guest will be notified')
        setMeetings(meetings.filter(({ id: mId }) => mId !== id))
      })
      .catch(({ message }) => {
        setActionResult(message)
      })
  }

  function changeHandler (
    id: string,
    beginsAt: Date | undefined,
    duration: number | undefined
  ) {
    let date = beginsAt
      ? beginsAt.toLocaleDateString().replaceAll('.', '/') +
        '/' +
        beginsAt.toLocaleTimeString().substr(0, 5)
      : undefined

    date = date?.length === 15 ? `0${date}` : date

    const authorizationToken = localStorage.getItem('token')

    if (!authorizationToken) {
      throw new Error('User not authenticated')
    }

    fetch(`/api/dean/counter-propose-meeting/${id}`, {
      method: 'POST',
      headers: {
        Authorization: authorizationToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date, duration })
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(
            'Cannot send proposition changes: ' + (await res.text())
          )
        }
      })
      .then(() => {
        setActionResult('Changes suggestions were send to guest.')
        const index = meetings.findIndex((met) => met.id === id)
        let items = [...meetings]
        items = items.filter((_, i) => i !== index)
        setMeetings(items)
      })
      .catch(({ message }) => {
        setActionResult(message)
        console.log(message)
      })
  }

  function handleCloseSnackbar () {
    setActionResult('')
  }

  const [calendar, setCalendar] = React.useState(false)
  const { matches, matchesAny, matchesAll } = useMediaQueries({
    screen: 'screen',
    width: '(max-width: 1118px)'
  })
  const styles = useStyles()

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={actionResult !== ''}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={actionResult}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit">
              <CloseIcon fontSize="small" onClick={handleCloseSnackbar} />
            </IconButton>
          </React.Fragment>
        }
      />
      <div className={styles.mainContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.info}>
            <DeanInfo updateOfficeHours={updateOfficeHours} dean={dean} />
          </div>
          {matches.width ? (
            <>
              <Breadcrumbs
                className={styles.breadcrumbs}
                aria-label="breadcrumb"
              >
                <StyledBreadcrumb
                  component="a"
                  href="#"
                  label="Meeting Suggestions"
                  onClick={() => {
                    setCalendar(false)
                  }}
                />
                <StyledBreadcrumb
                  label="Calendar"
                  onClick={() => {
                    setCalendar(true)
                  }}
                />
              </Breadcrumbs>
              <div className={styles.meetingsContainer}>
                {calendar ? (
                  <Calendar meetings={meetingsToGroupByDate} />
                ) : (
                  <MeetingSuggestions
                    meetings={meetingsToGroupByDate}
                    acceptHandler={acceptHandler}
                    cancelHandler={cancelHandler}
                    changeHandler={changeHandler}
                  />
                )}
              </div>
            </>
          ) : (
            <div className={styles.meetingsContainer}>
              <MeetingSuggestions
                meetings={meetingsToGroupByDate}
                acceptHandler={acceptHandler}
                cancelHandler={cancelHandler}
                changeHandler={changeHandler}
              />
              <Calendar meetings={meetingsToGroupByDate} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
