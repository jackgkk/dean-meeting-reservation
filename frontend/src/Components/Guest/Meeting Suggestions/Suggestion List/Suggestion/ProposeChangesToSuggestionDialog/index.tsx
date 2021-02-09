import React from 'react'
import Button from '@material-ui/core/Button'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import DialogContentText from '@material-ui/core/DialogContentText'
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import HelpIcon from '@material-ui/icons/Help'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

interface Props {
  open: boolean,
  setSuggestionChanges: Function
}

export default function ProposeChangesToSuggestionDialog ({ open }: Props) {
  const meetingTimeMarks = [
    { value: 5, label: '5 min' },
    { value: 15 },
    { value: 30, label: '30 min' },
    { value: 45 },
    { value: 60, label: '1 h' },
    { value: 90, label: '1 h 30 min' }
  ]

  return <>
        <Dialog
            open={open}
            onClose={console.log}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
              Propose changes to meeting
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    If meeting time or estimated duration not fits you, make changes to this
                  proposition and wait for response. After that guest can accept your changes or reject whole meeting.
                </DialogContentText>

              <p style={{ display: 'flex' }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardTimePicker
                    fullWidth
                    margin="normal"
                    id="time-picker"
                    label="Meeting time"
                    ampm={false}
                    value={console.log}
                    onChange={console.log}
                    /* error={meetingTimeOutOfRange}
                    helperText={meetingTimeErrorMessage} */
                  />
                </MuiPickersUtilsProvider>
                <ClickAwayListener
                  onClickAway={console.log}
                >
                  <p style={{ padding: '.5rem 0 0 .5rem' }}>
                    <Tooltip
                      /* onClose={() => setTimeHelpOpen(false)}
                      open={timeHelpOpen} */
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title='Pick time that suits you the most.
                If Dean already have appointment at this time, they
                can either refuse this meeting or propose more suitable hour.'
                    >
                      <IconButton
                        /* onClick={{() => setTimeHelpOpen(isOpen => !isOpen)}} */
                      >
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
                  /* onChange={handleEstMeetingTime} */
                />
              </p>
            </DialogContent>
            <DialogActions>
                <Button variant={'contained'} onClick={console.log} color="primary">
                    send changes
                </Button>
                <Button onClick={console.log} color="primary" autoFocus>
                    cancel
                </Button>
            </DialogActions>
        </Dialog>
    </>
}
