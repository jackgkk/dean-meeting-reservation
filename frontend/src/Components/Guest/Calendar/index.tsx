/* eslint-disable multiline-ternary */
import * as React from 'react'
import './index.scss'
import MeetingList from './MeetingList'
import {
  currentDate as CurrentDateType,
  Meeting as MeetingType
} from '../types'
import { MutableRefObject } from 'react'
import _ from 'lodash'
import { Typography } from '@material-ui/core'

const weekday = new Array(7)
weekday[0] = 'Sunday'
weekday[1] = 'Monday'
weekday[2] = 'Tuesday'
weekday[3] = 'Wednesday'
weekday[4] = 'Thursday'
weekday[5] = 'Friday'
weekday[6] = 'Saturday'
const today = new Date()

console.log(today)

const getPrettyDate = (date: Date) => {
  return (
    date.getDate().toString() +
    '.' +
    (date.getMonth() + 1).toString() +
    '.' +
    date.getFullYear().toString()
  )
}

interface MeetingProps {
  meetings: Array<MeetingType> | undefined
}

export default function Calendar ({ meetings }: MeetingProps) {
  const [currentDate, setCurrentDate] = React.useState(today)
  const [day, setDay] = React.useState({
    day: weekday[currentDate.getDay()],
    date: getPrettyDate(currentDate)
  })
  const groupedByDateMeetings = _(
    meetings?.filter((meeting) => meeting.accepted === true)
  )
    .groupBy('date')
    .map((meeting, date) => {
      return {
        date,
        meeting
      }
    })
    .value()

  // const yesterdayUpdateHandler = () => {
  //   today.setDate(today.getDate() - 1)
  //   setCurrentDate(today)
  //   setDay({
  //     day: weekday[currentDate.getDay()],
  //     date: getPrettyDate(currentDate)
  //   })
  // }

  // const tomorrowUpdateHandler = () => {
  //   today.setDate(today.getDate() + 1)
  //   setCurrentDate(today)
  //   setDay({
  //     day: weekday[currentDate.getDay()],
  //     date: getPrettyDate(currentDate)
  //   })
  // }

  return (
    <div className="calendar">
      <div className="infoBar">
        <div className="dateDiv">
          <h2>Incomming Meetings</h2>
        </div>
        {groupedByDateMeetings.length === 0 ? (
          <Typography variant="subtitle1">(empty)</Typography>
        ) : (
          ''
        )}
      </div>
      <div className="meetingList">
        {groupedByDateMeetings.map((group) => {
          return (
            <div key={group.date} style={{ paddingTop: '20px' }}>
              <Typography variant="body1" style={{ textAlign: 'center' }}>
                {weekday[group.meeting[0].beginsAt.getDay()]}, {group.date}
              </Typography>
              <MeetingList meetings={group.meeting} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
