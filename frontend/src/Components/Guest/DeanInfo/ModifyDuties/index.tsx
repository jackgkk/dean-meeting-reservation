import React, { ChangeEvent, useEffect, useState } from 'react'
import {
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, FormControl, FormHelperText, InputLabel,
  ListItem, ListItemSecondaryAction,
  ListItemText, MenuItem, Select
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Duty } from '../../types'
import List from '@material-ui/core/List'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { weekday } from '../index'
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import Divider from '@material-ui/core/Divider'
import AddIcon from '@material-ui/icons/Add'

interface props {
  isOpen: boolean
  onClose: (arg: any) => void
  currentDuties: Array<Duty>,
  onChange: (officeHours: Array<Duty>) => void
}

function areDutiesEqual (duty: Duty, anotherDuty: Duty): boolean {
  if (!duty || !anotherDuty) return false
  return anotherDuty.dayOfWeek === duty.dayOfWeek && anotherDuty.begins === duty.begins && anotherDuty.ends === duty.ends
}

export default function ModifyDuties ({ isOpen, onClose, currentDuties, onChange }: props) {
  const [declaredOfficeHours, setDeclaredOfficeHours] = useState(currentDuties)
  const [endsTimeErrorMessage, setEndsTimeErrorMessage] = useState('')

  useEffect(function () {
    setDeclaredOfficeHours(currentDuties)
  }, [currentDuties, isOpen])

  const [starts, setStarts] = useState<Date|null>(new Date())
  const [ends, setEnds] = useState<Date|null>(new Date())
  const [dayOfWeek, setDayOfWeek] = useState(0)

  function wasCurrentMeetingsModified (): boolean {
    return declaredOfficeHours.every((duty, i) =>
      areDutiesEqual(duty, currentDuties[i])) && currentDuties.every((duty, i) =>
      areDutiesEqual(duty, declaredOfficeHours[i]))
  }

  function handleDayOfWeek (e: React.ChangeEvent<{ value: unknown }>) {
    setDayOfWeek(e.target.value as number)
  }

  function handleStartsChange (date: Date|null) {
    setStarts(date)
    isEndDateValid(date as Date, ends as Date)
  }

  function handleEndsChange (date: Date|null) {
    setEnds(date)
    isEndDateValid(starts as Date, date as Date)
  }

  function diffMinutes (dt2: Date, dt1: Date): number {
    let diff = (dt1.getTime() - dt2.getTime()) / 1000
    diff /= 60
    return Math.round(diff)
  }

  function isEndDateValid (startDate: Date, endDate: Date): boolean {
    if (diffMinutes(startDate, endDate) < 5) {
      const startPlus5min = new Date(startDate.getTime())
      startPlus5min.setMinutes(startPlus5min.getMinutes() + 5)

      const message = 'Must be after ' + startPlus5min.toLocaleTimeString().substr(0, 5)
      setEndsTimeErrorMessage(message)

      return false
    } else {
      setEndsTimeErrorMessage('')

      return true
    }
  }

  function addNewOfficeHour () {
    if (!isEndDateValid(starts as Date, ends as Date)) return

    const duty = new Duty(
      dayOfWeek,
      starts?.toTimeString().substr(0, 5) as string,
      ends?.toTimeString().substr(0, 5) as string
    )

    if (declaredOfficeHours.some(currentDuty => areDutiesEqual(currentDuty, duty))) return

    setDeclaredOfficeHours(oo => [...oo, duty])
  }

  function prepareRemoveOfficeHour (index: number) {
    return function removeOfficeHour () {
      setDeclaredOfficeHours(declaredOfficeHours.filter((_, i) => index !== i))
    }
  }

  function sendChanges () {
    onChange(declaredOfficeHours)
  }

  return (
    <>
      <Dialog open={isOpen}>
        <ClickAwayListener onClickAway={onClose} mouseEvent={'onMouseUp'}>
          <div>
            <DialogTitle>
              Modify your duties
            </DialogTitle>
            <DialogContent>
              <List>
                {declaredOfficeHours.map(({ dayOfWeek, begins, ends }, i) =>
                  <ListItem button key={i}>
                    <ListItemText
                      primary={weekday[dayOfWeek] + 's'}
                      secondary={`${begins} - ${ends}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={prepareRemoveOfficeHour(i)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
                <Divider />
                <DialogTitle>
                  Add new office hour
                </DialogTitle>
                <ListItem button>
                  <div>
                    <FormControl
                      style={{ top: '1rem', flexDirection: 'initial', alignItems: 'baseline' }}
                    >
                      <div>
                        <InputLabel style={{ top: 'unset' }} htmlFor={'day-of-week'}>On</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={dayOfWeek}
                          onChange={handleDayOfWeek}
                          style={{ maxWidth: '8rem' }}
                          inputProps={{ id: 'day-of-week' }}
                        >
                          <MenuItem value={0}>Sundays</MenuItem>
                          <MenuItem value={1}>Mondays</MenuItem>
                          <MenuItem value={2}>Tuesdays</MenuItem>
                          <MenuItem value={3}>Wednesdays</MenuItem>
                          <MenuItem value={4}>Thursdays</MenuItem>
                          <MenuItem value={5}>Fridays</MenuItem>
                          <MenuItem value={6}>Saturdays</MenuItem>
                        </Select>
                      </div>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardTimePicker
                        style={{ maxWidth: '8rem', padding: '0 .25rem' }}
                        margin="normal"
                        id="begins-time-picker"
                        label="Begins"
                        value={starts}
                        onChange={handleStartsChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change time'
                        }}
                        ampm={false}
                      />
                      <KeyboardTimePicker
                        style={{ maxWidth: '8rem' }}
                        margin="normal"
                        id="ends-time-picker"
                        label="Ends"
                        value={ends}
                        onChange={handleEndsChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change time'
                        }}
                        ampm={false}
                        helperText={endsTimeErrorMessage}
                        error={!!endsTimeErrorMessage}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                  <IconButton onClick={addNewOfficeHour}>
                    <AddIcon />
                  </IconButton>
                </ListItem>
              </List>
            </DialogContent>
            <DialogActions>
              <Button
                color='primary'
                variant={'contained'}
                disabled={wasCurrentMeetingsModified()}
                onClick={sendChanges}
              >save</Button>
              <Button color='primary' variant='outlined' onClick={onClose}>cancel</Button>
            </DialogActions>
          </div>
        </ClickAwayListener>
      </Dialog>
    </>
  )
}
