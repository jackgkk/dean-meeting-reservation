import * as React from 'react'
import { currentDate as CurrentDateType, Meeting as MeetingType } from '../../../types'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import classes from '*.module.css'
import Fade from '@material-ui/core/Fade'
import './icons/*.svg'

interface meetingProps {
  meeting: MeetingType
}

const useStyles = makeStyles({
  meetingContainer: {
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  meetingAccordion: {
    flexGrow: 1,
    float: 'right',
    borderRadius: 'none',
    boxShadow: 'none',
    '&.MuiAccordion-root:before': {
      height: '0px'
    },
    transition: '0.2s',
    transitionTimingFunction: 'ease'
  },
  h2: {
    fontFamily: 'Montserrat',
    fontSize: '20px'
  },
  accordionSummary: {
    border: 'none',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative'
  },
  desiredPeriod: {
    lineHeight: '15px',
    color: '#000000',
    textAlign: 'left',
    minWidth: '2rem'
  },
  attendantName: {
    margin: 'auto',
    padding: '6px',
    backgroundColor: '#D4241D',
    color: '#ffffff',
    flexGrow: 1
  },
  accordionDetails: {
    marginTop: '-0.75rem',
    alignItems: 'center',
    textAlign: 'left'
  }

})

const panel1 = false

export default function Meeting ({ meeting }: meetingProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const styling = useStyles()
  const [checked, setChecked] = React.useState(false)

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
    setChecked((prev) => !prev)
  }

  const endTime = new Date() // get current date
  endTime.setHours(meeting.pickedTimeWindow.getHours(), meeting.pickedTimeWindow.getMinutes() + 15, 0, 0)

  return (
    <div className={styling.meetingContainer} >
        <div className={styling.desiredPeriod}>
              <Typography variant="body2">
              {meeting.pickedTimeWindow.getHours() < 10 ? '0' + meeting.pickedTimeWindow.getHours() : meeting.pickedTimeWindow.getHours()}
              :{meeting.pickedTimeWindow.getMinutes() < 10 ? '0' + meeting.pickedTimeWindow.getMinutes() : meeting.pickedTimeWindow.getMinutes()}
              </Typography>
              <Typography variant="body2">
              {endTime.getHours() < 10 ? '0' + endTime.getHours() : endTime.getHours()}
              :{endTime.getMinutes() + 15 < 10 ? '0' + endTime.getMinutes() : endTime.getMinutes()}
              </Typography>
        </div>
        <Accordion className={styling.meetingAccordion} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className={styling.accordionSummary}
          >
            <div className={styling.attendantName}>
              <Typography variant="h2">{meeting.name} {meeting.surname}</Typography>
            </div>
          </AccordionSummary>
            <AccordionDetails className={styling.accordionDetails}>
              <Typography variant="body1">
                {meeting.goal}
              </Typography>
            </AccordionDetails>
        </Accordion>

     </div>
  )
}
