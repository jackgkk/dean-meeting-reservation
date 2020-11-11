import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { createStyles, Theme } from '@material-ui/core'
import Style from '../../style'
import { Duty as DutyType } from '../../../types'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

interface DutyProps {
  duty: DutyType,
  show: boolean
}

const dayNames = [
  'Monday',
  'Thursday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

export default function Duty (props: DutyProps) {
  const classes = makeStyles(function (theme: Theme) {
    return createStyles(Style(theme))
  })()

  const { dayOfWeek, begins, ends } = props.duty
  const { show } = props

  return (
    <Collapse in={show} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <Divider />
        <ListItem className={classes.duty}>
          <ListItemText
            primary={dayNames[dayOfWeek]}
            secondary={`${begins} - ${ends}`}
          />
          <Button style={{ backgroundColor: '#e5231b', color: '#fff' }}>set a meeting</Button>
        </ListItem>
      </List>
    </Collapse>
  )
}
