import React, { ChangeEvent, useEffect, useState } from 'react'
import {
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, FormControl, InputLabel,
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
  currentDuties: Array<Duty>
}

export default function ModifyDuties ({ isOpen, onClose, currentDuties }: props) {
  const [declaredOfficeHours, setDeclaredOfficeHours] = useState(currentDuties)

  useEffect(function () {
    setDeclaredOfficeHours([...currentDuties])
  }, [])

  const [starts, setStarts] = useState<Date|null>()
  const [ends, setEnds] = useState<Date|null>()
  const [dayOfWeek, setDayOfWeek] = useState(0)

  function handleDayOfWeek (e: React.ChangeEvent<{ value: unknown }>) {
    setDayOfWeek(e.target.value as number)
  }

  function handleStartsChange (date: Date|null) {
    setStarts(date)
  }

  function handleEndsChange (date: Date|null) {
    setEnds(date)
  }

  function addNewOfficeHour () {
    setDeclaredOfficeHours(oo => [...oo,
      new Duty(
        dayOfWeek,
        starts?.toTimeString().substr(0, 5) as string,
        ends?.toTimeString().substr(0, 5) as string
      )
    ])
  }

  function prepareRemoveOfficeHour (index: number) {
    return function removeOfficeHour () {
      setDeclaredOfficeHours(declaredOfficeHours.filter((_, i) => index !== i))
    }
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
                  <FormControl style={{ minWidth: '20rem', flexDirection: 'initial', alignItems: 'baseline' }}>
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
                        <MenuItem value={0}>Mondays</MenuItem>
                        <MenuItem value={1}>Tuesdays</MenuItem>
                        <MenuItem value={2}>Wednesdays</MenuItem>
                        <MenuItem value={3}>Thursdays</MenuItem>
                        <MenuItem value={4}>Fridays</MenuItem>
                        <MenuItem value={5}>Saturdays</MenuItem>
                        <MenuItem value={6}>Sundays</MenuItem>
                      </Select>
                    </div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardTimePicker
                        style={{ maxWidth: '8rem', padding: '0 .25rem' }}
                        margin="normal"
                        id="begins-time-picker"
                        label="Begins"
                        value={new Date()}
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
                        value={new Date()}
                        onChange={handleEndsChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change time'
                        }}
                        ampm={false}
                      />
                      <IconButton onClick={addNewOfficeHour}>
                        <AddIcon />
                      </IconButton>
                    </MuiPickersUtilsProvider>
                  </FormControl>
                </ListItem>
              </List>
            </DialogContent>
            <DialogActions>
              <Button color='primary' variant={'contained'}>save</Button>
              <Button color='primary' variant='outlined'>cancel</Button>
            </DialogActions>
          </div>
        </ClickAwayListener>
      </Dialog>
    </>
  )
}
