import * as React from 'react'
import {
  currentDate as CurrentDateType,
  Meeting as MeetingType
} from '../../../types'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import classes from '*.module.css'
import Fade from '@material-ui/core/Fade'
import './icons/*.svg'
import { useStyles } from './style'

interface meetingProps {
  meeting: MeetingType
}

const panel1 = false

export default function Meeting ({ meeting }: meetingProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const styling = useStyles()
  const [checked, setChecked] = React.useState(false)

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false)
    setChecked((prev) => !prev)
  }

  const endTime = new Date() // get current date
  endTime.setHours(
    meeting.beginsAt.getHours(),
    meeting.beginsAt.getMinutes() + 15,
    0,
    0
  )

  return (
    <div className={styling.meetingContainer}>
      <div className={styling.desiredPeriod}>
        <Typography variant="body2">
          {meeting.beginsAt.getHours() < 10
            ? '0' + meeting.beginsAt.getHours()
            : meeting.beginsAt.getHours()}
          :
          {meeting.beginsAt.getMinutes() < 10
            ? '0' + meeting.beginsAt.getMinutes()
            : meeting.beginsAt.getMinutes()}
        </Typography>
        <Typography variant="body2">
          {endTime.getHours() < 10
            ? '0' + endTime.getHours()
            : endTime.getHours()}
          :
          {endTime.getMinutes() + 15 < 10
            ? '0' + endTime.getMinutes()
            : endTime.getMinutes()}
        </Typography>
      </div>
      <Accordion
        className={styling.meetingAccordion}
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={styling.accordionSummary}
        >
          <div className={styling.attendantName}>
            <Typography variant="h2">
              {meeting.guest.name} {meeting.guest.surname}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={styling.accordionDetails}>
          <Typography variant="body1">{meeting.goal}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
