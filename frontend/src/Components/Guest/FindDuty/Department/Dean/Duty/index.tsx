import React, { useEffect } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { createStyles, Theme } from '@material-ui/core'
import Style from '../../style'
import Dean from '../../../../../../Dean'
import DutyType from '../../../../../../Duty'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { useRecoilState } from 'recoil'
import { meetingDeanState, meetingDutyState, meetingForm, showMeetingFormState } from '../../../state'
import MeetingProposition from '../../../../../../MeetingProposition'
import Guest from '../../../../../../Guest'

interface DutyProps {
  dean: Dean
  duty: DutyType,
  show: boolean,
}

const dayNames = [
  'Sunday',
  'Monday',
  'Thursday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

export default function Duty (props: DutyProps) {
  const classes = makeStyles(function (theme: Theme) {
    return createStyles(Style(theme))
  })()

  const { duty } = props
  const { dayOfWeek, begins, ends } = duty
  const { show, dean } = props

  const [_meetingState, setMeetingState] = useRecoilState(meetingForm)
  const setIsFormOpen = useRecoilState(showMeetingFormState)[1]
  const setMeetingDuty = useRecoilState(meetingDutyState)[1]
  const setMeetingDean = useRecoilState(meetingDeanState)[1]

  return (
    <Collapse in={show} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <Divider />
        <ListItem className={classes.duty}>
          <ListItemText
            primary={dayNames[dayOfWeek]}
            secondary={`${begins} - ${ends}`}
          />
          <Button
            style={{ backgroundColor: '#e5231b', color: '#fff' }}
            onClick={function handleClick () {
              setMeetingState(() =>
                new MeetingProposition(new Guest('', '', '', 'Student'), dean.id, '', '00:00', 0, false, false))
              setIsFormOpen(true)
              setMeetingDuty(duty)
              setMeetingDean(dean)
            }}
          >
            set a meeting</Button>
        </ListItem>
      </List>
    </Collapse>
  )
}
