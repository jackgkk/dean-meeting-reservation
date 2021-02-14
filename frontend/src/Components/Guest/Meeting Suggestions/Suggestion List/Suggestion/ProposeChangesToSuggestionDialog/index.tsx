import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core'
import DialogContentText from '@material-ui/core/DialogContentText'
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import HelpIcon from '@material-ui/icons/Help'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

interface Props {
  open: boolean
  onClose: () => void
  sendMeetingChanges: (date: Date|undefined, duration: number|undefined) => void
  currentDate: Date
  currentDuration: number
}

interface MeetingChanges {
  id: string,
  date: Date,
  duration: number,
}

export default function ProposeChangesToSuggestionDialog ({ open, onClose, sendMeetingChanges, currentDate, currentDuration }: Props) {
  const meetingTimeMarks = [
    { value: 0 },
    { value: 5, label: '5 min' },
    { value: 15 },
    { value: 30, label: '30 min' },
    { value: 45 },
    { value: 60, label: '1 h' },
    { value: 90, label: '1 h 30 min' }
  ]

  const [newDateTime, setNewDateTime] = useState<Date|null>(null)
  const [estMeetingTime, setEstMeetingTime] = useState<number>(0)

  useEffect(() => {
    setEstMeetingTime(currentDuration)
    setNewDateTime(currentDate)
  }, [open])

  function handleDateChange (date: Date | null) {
    setNewDateTime(date)
  }

  const [meetingChanges, setMeetingChanges] = useState({ id: '', date: new Date(), duration: 0 })

  return (<>
        <Dialog
            open={open}
            onClose={console.log}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
           <ClickAwayListener
            onClickAway={onClose}
          >
            <div>
              <DialogTitle id="alert-dialog-title">
                Propose changes to meeting
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  If meeting time or estimated duration not fits you, make changes to this
                  proposition and wait for response. After that guest can accept your changes or reject whole meeting.
                </DialogContentText>

                <p style={{ display: 'flex' }}>
                  <Grid container justify="space-around">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        style={{ maxWidth: '15rem' }}
                        margin="normal"
                        id="date-picker-dialog"
                        label="Change date"
                        format="dd/MM/yyyy"
                        value={newDateTime}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date'
                        }}
                      />
                      <KeyboardTimePicker
                        style={{ maxWidth: '15rem' }}
                        margin="normal"
                        id="time-picker"
                        label="Change time"
                        ampm={false}
                        value={newDateTime}
                        onChange={handleDateChange}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </p>
                <p>
                  <Typography>Change estimated duration</Typography>
                  <Slider
                    name='estTime'
                    value={estMeetingTime}
                    step={null}
                    marks={meetingTimeMarks}
                    valueLabelDisplay='auto'
                    onChange={handleEstMeetingTime}
                  />
                </p>
              </DialogContent>
              <DialogActions>
                <Button
                  variant={'contained'}
                  onClick={handleSendChanges}
                  color="primary"
                  disabled={
                    newDateTime?.toDateString() ===
                    currentDate.toDateString() &&
                    estMeetingTime === currentDuration &&
                      newDateTime?.toTimeString().substr(0, 5) ===
                      currentDate.toTimeString().substr(0, 5)
                  }
                >
                  send changes
                </Button>
                <Button
                  onClick={onClose}
                  color="primary"
                  autoFocus
                >
                  cancel
                </Button>
              </DialogActions>
            </div>
           </ClickAwayListener>
        </Dialog>
    </>)

  function handleEstMeetingTime (ev: any, newVal: number | number[]) {
    console.log(newVal as number)
    setEstMeetingTime(newVal as number)
  }

  function handleBeginsAtChange (date: Date | null) {
    if (!(date instanceof Date)) return

    setNewDateTime(date)

    setMeetingChanges(prevState => ({ ...prevState, date }))
  }

  function handleSendChanges () {
    sendMeetingChanges(
      newDateTime !== currentDate ? (newDateTime || undefined) : undefined,
      estMeetingTime !== currentDuration ? (estMeetingTime || undefined) : undefined)
    onClose()
  }
}
