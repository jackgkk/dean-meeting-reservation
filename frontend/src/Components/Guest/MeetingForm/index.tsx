import Dialog from '@material-ui/core/Dialog/Dialog'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Style from './style'
import { createStyles, MenuItem } from '@material-ui/core'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogContent from '@material-ui/core/DialogContent'
import Select from '@material-ui/core/Select'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useTheme from '@material-ui/core/styles/useTheme'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import HelpIcon from '@material-ui/icons/Help'
import IconButton from '@material-ui/core/IconButton'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { useRecoilState } from 'recoil'
import Guest from '../../../Guest'
import { meetingDutyState, meetingForm, showMeetingFormState, submittingStatusState } from '../FindDuty/state'
import MeetingProposition from '../../../MeetingProposition'
import CircularProgress from '@material-ui/core/CircularProgress'

interface MeetingFormData {
  guest: Guest,
  description?: string,
  beginsAt: string,
  duration: number,
  isOnline: boolean,
  isNotRobot: boolean
}

export default function MeetingForm () {
  const classes = makeStyles(theme => {
    return createStyles(Style(theme))
  })()

  const fullScreen = useMediaQuery(useTheme().breakpoints.down('xs'))

  const [formData, setFormData] = useRecoilState(meetingForm)
  const [meetingDuty] = useRecoilState(meetingDutyState)
  const [showMeetingForm, setShowMeetingForm] = useRecoilState(showMeetingFormState)

  const [meetingTimeOutOfRange, setMeetingTimeOutOfRange] = useState(false)

  const [submittingStatus, setSubmittingStatus] = useRecoilState(submittingStatusState)

  const [submittingError, setSubmittingError] = useState<Error>()

  useEffect(function () {
    if (submittingStatus === 'success' || submittingStatus === 'error') {
      setShowMeetingForm(false)
    }
  }, [submittingStatus])

  function handleChange (ev: ChangeEvent<{name?: string, value: unknown}>) {
    const { name, value } = ev.target

    if (!name) return

    setFormData(prevState => {
      if (name in prevState.guest) {
        return {
          ...prevState,
          guest: {
            ...prevState.guest,
            [name]: value
          }
        } as MeetingProposition
      } else if (name in prevState) {
        return {
          ...prevState,
          [name]: value
        } as MeetingProposition
      } else return prevState
    })
  }

  function handleEstMeetingTime (ev: any, newVal: number | number[]) {
    setFormData(prevState => ({
      ...prevState,
      duration: newVal as number
    }))
  }

  function handleCheckboxChange (ev: ChangeEvent<HTMLInputElement>) {
    const { name } = ev.target

    if (name !== 'isOnline' && name !== 'isNotRobot') return

    setFormData(prevState => ({
      ...prevState,
      [name]: !prevState[name]
    }))
  }

  function handleSubmit (ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()

    if (meetingTimeOutOfRange) return

    setSubmittingStatus('submitting')

    fetch('/api/meeting/create-proposition', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then(handleSuccessfulSubmit).catch(console.warn)

    console.log(formData)
  }

  function handleSuccessfulSubmit (response: Response) {
    if (response.status === 200) {
      setSubmittingStatus('success')
    }
  }

  const meetingTimeMarks = [
    { value: 5, label: '5 min' },
    { value: 15 },
    { value: 30, label: '30 min' },
    { value: 45 },
    { value: 60, label: '1 h' },
    { value: 90, label: '1 h 30 min' }
  ]

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  )

  const handleBeginsAtChange = (date: Date | null) => {
    if (!(date instanceof Date)) return

    setSelectedDate(date)

    const beginsAt = `${date.getHours().toString()}:${date.getMinutes().toString()}`
    const { begins, ends } = meetingDuty

    setFormData(prevState => ({ ...prevState, beginsAt }))

    if (!isInTimeRange(beginsAt, begins, ends)) {
      setMeetingTimeOutOfRange(true)
    } else {
      setMeetingTimeOutOfRange(false)
    }
  }

  function isInTimeRange (time: string, start: string, end: string) {
    const timeDate = new Date()
    const startDate = new Date()
    const endDate = new Date()

    startDate.setHours(
      parseInt(start.substring(0, start.indexOf(':'))),
      parseInt(start.substring(start.indexOf(':') + 1))
    )

    endDate.setHours(
      parseInt(end.substring(0, end.indexOf(':'))),
      parseInt(end.substring(end.indexOf(':') + 1))
    )

    timeDate.setHours(
      parseInt(time.substring(0, time.indexOf(':'))),
      parseInt(time.substring(time.indexOf(':') + 1))
    )

    return timeDate >= startDate && timeDate < endDate
  }

  const [timeHelpOpen, setTimeHelpOpen] = useState(false)

  const meetingTimeErrorMessage = meetingTimeOutOfRange
    ? `${formData.beginsAt} is incorrect. Choose time between ${meetingDuty.begins} and ${meetingDuty.ends}`
    : ''

  return (
    <Dialog
      open={true}
      fullWidth={true}
      className={classes.meetingForm}
      fullScreen={fullScreen}
    >
      <DialogTitle>New meeting</DialogTitle>
      <DialogContent>
        <DialogContentText>
          We need some info about you and meeting you&apos;re planning
        </DialogContentText>
        <DialogContentText style={{ marginTop: '2rem' }}>
          <Typography color='textPrimary' style={{ fontSize: '1.25rem' }}>
            Personal info
          </Typography>
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <p>
            <TextField
              fullWidth
              color="primary"
              label='Name'
              name='name'
              required
              onChange={handleChange}
              value={formData.guest.name}
            />
          </p>
          <p>
            <TextField
              fullWidth
              required
              label='Surname'
              name='surname'
              onChange={handleChange}
              value={formData.guest.surname}
            />
          </p>
          <p>
            <TextField
              fullWidth
              required
              type='email'
              label='Email'
              name='email'
              onChange={handleChange}
              value={formData.guest.email}
            />
          </p>
          <p style={{ marginTop: '2rem' }}>
            <Select
              fullWidth
              required
              label='Status'
              labelId='label-for-status'
              name='status'
              defaultValue='Student'
              onChange={handleChange}
              value={formData.guest.status}
            >
              <MenuItem value='Student'>Student</MenuItem>
              <MenuItem value='Faculty employee'>Faculty employee</MenuItem>
              <MenuItem value='University employee'>University employee</MenuItem>
              <MenuItem value='Other'>Other</MenuItem>
            </Select>
          </p>
          <DialogContentText style={{ marginTop: '2rem' }}>
            <Typography color='textPrimary' style={{ fontSize: '1.25rem' }}>
              Meeting details
            </Typography>
          </DialogContentText>
          <p>
            <TextField
              fullWidth
              multiline
              label='What this meeting is about'
              name='description'
              rowsMax={3}
              inputProps={{ maxlength: '255' }}
              onChange={handleChange}
              value={formData.description}
            />
          </p>
          <p style={{ display: 'flex' }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                fullWidth
                margin="normal"
                id="time-picker"
                label="Meeting time"
                value={selectedDate}
                onChange={handleBeginsAtChange}
                ampm={false}
                error={meetingTimeOutOfRange}
                helperText={meetingTimeErrorMessage}
              />
            </MuiPickersUtilsProvider>
            <ClickAwayListener onClickAway={() => setTimeHelpOpen(false)}>
              <p style={{ padding: '.5rem 0 0 .5rem' }}>
                <Tooltip
                  onClose={() => setTimeHelpOpen(false)}
                  open={timeHelpOpen}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title='Pick time that suits you the most.
                If Dean already have appointment at this time, they
                can either refuse this meeting or propose more suitable hour.'
                >
                  <IconButton onClick={() => setTimeHelpOpen(isOpen => !isOpen)}>
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </p>
            </ClickAwayListener>
          </p>
          <p>
            <Typography>Estimated meeting time</Typography>
            <Slider
              name='estTime'
              defaultValue={5}
              step={null}
              marks={meetingTimeMarks}
              valueLabelDisplay='auto'
              onChange={handleEstMeetingTime}
            />
          </p>
          <p>
            <FormGroup>
              <FormControlLabel
                label='Online meeting'
                control={
                  <Tooltip
                    title='Check if you want to meet using online platform, i.e MS Teams'
                  >
                    <Checkbox
                      name='isOnline'
                      checked={formData.isOnline}
                      value={formData.isOnline}
                      onChange={handleCheckboxChange}
                      color='primary'
                    />
                  </Tooltip>
                }
              />
            </FormGroup>
          </p>
          <p>
            {/* Integrate real captcha later */}
            <FormGroup>
              <FormControlLabel
                label='I&apos;m not a robot'
                control={
                  <Checkbox
                    name='isNotRobot'
                    checked={formData.isNotRobot}
                    required
                    onChange={handleCheckboxChange}
                    color='primary'
                  />
                }
              />
            </FormGroup>
          </p>
          <p>
            <Button
              style={{ alignItems: 'center' }}
              disabled={submittingStatus === 'submitting'}
              color='primary'
              variant={'contained'}
              type='submit'
            >
              <span style={{ paddingRight: submittingStatus === 'submitting' ? '1rem' : '' }}>
              Send meeting request
              </span>
              {submittingStatus === 'submitting' &&
              <CircularProgress
                size={20}
                color='primary'
              />}
            </Button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
