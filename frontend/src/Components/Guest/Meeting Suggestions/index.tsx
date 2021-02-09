import { Typography, createStyles } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import * as React from 'react'
import SuggestionList from './Suggestion List'
import './styling/index.scss'
import {
  currentDate as CurrentDateType,
  Meeting as MeetingType,
  InputMeetingType as NewMeetingType
} from '../types'
import { Dispatch, SetStateAction } from 'react'
import groupBy from 'lodash.groupby'
import _ from 'lodash'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import clsx from 'clsx'
import getStyle from './styling/style'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import ProposeChangesToSuggestionDialog from './Suggestion List/Suggestion/ProposeChangesToSuggestionDialog'

interface MeetingProps {
  meetings: Array<MeetingType> | undefined
  acceptHandler: (id: string) => void
  cancelHandler: (id: string) => void
  changeHandler: (id: string, beginsAt: Date, duration: number) => void
}

const weekday = new Array(7)
weekday[0] = 'Sunday'
weekday[1] = 'Monday'
weekday[2] = 'Tuesday'
weekday[3] = 'Wednesday'
weekday[4] = 'Thursday'
weekday[5] = 'Friday'
weekday[6] = 'Saturday'

function MeetingSuggestions ({
  meetings,
  acceptHandler,
  cancelHandler,
  changeHandler
}: MeetingProps) {
  const groupedByDateMeetings = _(
    meetings?.filter((meeting) => meeting.accepted === false)
  )
    .groupBy('date')
    .map((meeting, date) => {
      return {
        date,
        meeting
      }
    })
    .value()

  const style = makeStyles(function (theme: Theme) {
    return createStyles(getStyle(theme))
  })()

  return (
    <div className="MeetingSugDiv" id="style-4">
      <Typography variant="h3">Meeting Suggestions</Typography>
      {groupedByDateMeetings.length
        ? groupedByDateMeetings.map((group) => {
            return (
          <div key={group.date}>
            <Timeline className={clsx(style.timelineContainer)}>
              <TimelineItem className={clsx(style.timeline)}>
                <TimelineOppositeContent
                  className={clsx(style.oppositeContent)}
                >
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    {weekday[group.meeting[0].beginsAt.getDay()]},
                  </Typography>
                  <Typography variant="body2" style={{ textAlign: 'left' }}>
                    {group.date}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator className={clsx(style.timelineSeparator)}>
                  <TimelineDot className={clsx(style.timelineDot)} />
                  <TimelineConnector
                    className={clsx(style.timelineConnector)}
                  />
                </TimelineSeparator>
                <TimelineContent className={clsx(style.content)}>
                  <Typography>
                    <SuggestionList
                      meetings={group.meeting}
                      acceptHandler={acceptHandler}
                      cancelHandler={cancelHandler}
                      changeHandler={changeHandler}
                    />
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>
            )
          })
        : <p className={clsx(style.noSuggestionsInfo)}>No suggestions for now</p>}
    </div>
  )
}

export default MeetingSuggestions
