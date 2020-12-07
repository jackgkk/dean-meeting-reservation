import { makeStyles, Typography } from '@material-ui/core'
import * as React from 'react'
import SuggestionList from './Suggestion List'
import './index.scss'
import { currentDate as CurrentDateType, Meeting as MeetingType } from '../types'
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

interface MeetingProps{
  meetings: Array<MeetingType>|undefined
  acceptHandler: (id: string) => void
  cancelHandler: (id: string) => void
}

const weekday = new Array(7)
weekday[0] = 'Sunday'
weekday[1] = 'Monday'
weekday[2] = 'Tuesday'
weekday[3] = 'Wednesday'
weekday[4] = 'Thursday'
weekday[5] = 'Friday'
weekday[6] = 'Saturday'

const useStyle = makeStyles({
  oppositeContent: {
    flex: 0,
    padding: '0px'
  },
  timelineContainer: {
    padding: '0px'
  },
  timeline: {
    display: 'inline-grid',
    gridTemplateColumns: '11% 4% 85%'
  },
  content: {
    padding: '0px',
    marginTop: '-1.3rem'
  },
  timelineDot: {
    boxShadow: 'none',
    borderWidth: '2px',
    padding: '1.5px',
    // marginTop: '1.1rem',
    background: '#E5231B',
    marginTop: '2rem'
  },
  timelineConnector: {
    // marginLeft: '2px',
    background: 'rgba(0,0,0,0.05)',
    marginTop: '-1.2rem',
    width: '1px '
  },
  timelineSeparator: {
    margin: '0px auto'
  }
})

export default function MeetingSuggestions ({ meetings, acceptHandler, cancelHandler }: MeetingProps) {
  const groupedByDateMeetings = _(meetings?.filter(meeting => meeting.isAccepted === false))
    .groupBy('date')
    .map((meeting, date) => {
      return (
        {
          date,
          meeting
        }
      )
    }).value()

  const style = useStyle()

  return (
        <div className="MeetingSugDiv" id="style-4">
            <Typography variant='h3'>Meeting Suggestions</Typography>
            {groupedByDateMeetings.map(group => {
              return (
                <div key={group.date} >
                    <Timeline className={clsx(style.timelineContainer)}>
                      <TimelineItem className={clsx(style.timeline)}>
                        <TimelineOppositeContent className={clsx(style.oppositeContent)}>
                          <Typography variant="body2" style={{ textAlign: 'left' }}>{weekday[group.meeting[0].pickedTimeWindow.getDay()]},</Typography>
                          <Typography variant="body2" style={{ textAlign: 'left' }}>{group.date}</Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator className={clsx(style.timelineSeparator)}>
                          <TimelineDot className={clsx(style.timelineDot)}/>
                          <TimelineConnector className={clsx(style.timelineConnector)}/>
                        </TimelineSeparator>
                        <TimelineContent className={clsx(style.content)}>
                          <Typography>
                            <SuggestionList meetings={group.meeting} acceptHandler={acceptHandler} cancelHandler={cancelHandler}></SuggestionList>
                          </Typography>
                        </TimelineContent>
                      </TimelineItem>
                    </Timeline>
                </div>
              )
            })}
        </div>
  )
}
