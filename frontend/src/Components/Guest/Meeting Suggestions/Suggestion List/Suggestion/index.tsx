/* eslint-disable multiline-ternary */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grow,
  Icon,
  IconButton,
  Typography
} from '@material-ui/core'
import * as React from 'react'
import { Meeting as MeetingType } from '../../../types'
import { CheckIcon, CancelIcon, ChangeTimeIcon } from './icons'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useStyles } from './style'
import teams from './icons/Teams.png'
import ProposeChangesToSuggestionDialog from './ProposeChangesToSuggestionDialog'
import { useEffect, useState } from 'react'
import { useMediaQueries } from '@react-hook/media-query'

interface meetingProps {
  meeting: MeetingType
  acceptHandler: (id: string) => void
  cancelHandler: (id: string) => void
  changeHandler: (
    id: string,
    beginsAt: Date | undefined,
    duration: number | undefined
  ) => void
}

export default function MeetingSuggestion ({
  meeting,
  acceptHandler,
  cancelHandler,
  changeHandler
}: meetingProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const [checked, setChecked] = React.useState(false)
  const [
    showModifyMeetingDetailsDialog,
    setShowModifyMeetingDetailsDialog
  ] = useState(false)

  function setMeetingChanges (
    dateTime: Date | undefined,
    duration: number | undefined
  ) {
    const { id, beginsAt } = meeting

    changeHandler(id, dateTime, duration)

    console.log({ dateTime, duration })
  }

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false)
    setChecked((prev) => !prev)
  }

  const [endTime, setEndTime] = useState(new Date())

  useEffect(function () {
    const ends = meeting.beginsAt
    ends.setMinutes(ends.getMinutes() + meeting.duration)
    setEndTime(ends)
  }, [])

  const styling = useStyles()

  const { matches, matchesAny, matchesAll } = useMediaQueries({
    screen: 'screen',
    width: '(max-width: 500px)'
  })

  return (
    <div>
      <Accordion
        className={
          expanded
            ? styling.suggestionAccordionExpanded
            : styling.suggestionAccordion
        }
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <img src="" alt="" />
          <div className={styling.accordionSummaryContent}>
            <div className={styling.nameAndTimeDiv}>
              {/* <Grow in={expanded}> */}
              {expanded && (
                <div className={styling.meetingPeriodDiv}>
                  <Typography variant="h3">
                    {`${meeting.beginsAt.toTimeString().substr(0, 5)}-${endTime.toTimeString().substr(0, 5)}`}
                  </Typography>
                </div>
              )}
              {/* </Grow> */}
              <div>
                <Typography variant="h2">
                  {meeting.guest.name} {meeting.guest.surname}
                </Typography>
              </div>
            </div>
            <div className={styling.isOnlineDiv}>
              {meeting.isOnline ? (
                <img src={teams} alt="aasd" />
              ) : (
                <Typography variant="body2">na żywo</Typography>
              )}
            </div>
            {!expanded ? (
              <div className={styling.meetingPeriodDiv}>
                <Typography variant="h3">
                  {`${meeting.beginsAt.toTimeString().substr(0, 5)}-${endTime.toTimeString().substr(0, 5)}`}
                </Typography>
              </div>
            ) : (
              <AccordionDetails className={styling.meetingGoal}>
                <div>
                  <Typography variant="body1">
                    &quot;{meeting.goal}&quot;
                  </Typography>
                </div>
              </AccordionDetails>
            )}
            <div className={styling.actionButtonsContainer}>
              <IconButton
                aria-label="accept"
                onClick={function (event) {
                  acceptHandler(meeting.id)
                  event.stopPropagation()
                }}
                onFocus={(event) => event.stopPropagation()}
              >
                <CheckIcon className={styling.actionButton} />
              </IconButton>
              <IconButton
                aria-label="cancel"
                onClick={function (event) {
                  cancelHandler(meeting.id)
                  event.stopPropagation()
                }}
              >
                <CancelIcon className={styling.actionButton} />
              </IconButton>
              <IconButton
                aria-label="suggest other time"
                onClick={function (event) {
                  setShowModifyMeetingDetailsDialog(true)
                  event.stopPropagation()
                }}
              >
                <ChangeTimeIcon className={styling.actionButton} />
              </IconButton>
            </div>
          </div>
        </AccordionSummary>
      </Accordion>
      <ProposeChangesToSuggestionDialog
        currentDate={meeting.beginsAt}
        currentDuration={meeting.duration}
        open={showModifyMeetingDetailsDialog}
        onClose={() => setShowModifyMeetingDetailsDialog(false)}
        sendMeetingChanges={setMeetingChanges}
      />
    </div>
  )
}

function requestNewMeetingDetails () {}
