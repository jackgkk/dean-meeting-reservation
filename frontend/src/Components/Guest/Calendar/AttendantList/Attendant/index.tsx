import * as React from 'react'
import { currentDate as CurrentDateType, Attendant as AttendantType } from '../../types'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import './index.scss'

interface AttendantProps {
  attendant: AttendantType
}

const panel1 = false

export default function Attendant ({ attendant }: AttendantProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
        <div className="attendantAccordionDiv">
          <Accordion className="attendantAccordion" expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <div className="desiredPeriod">
                <Typography variant="body2">
                  {attendant.date.getHours() < 10 ? '0' + attendant.date.getHours() : attendant.date.getHours()}
                  :{attendant.date.getMinutes() < 10 ? '0' + attendant.date.getMinutes() : attendant.date.getMinutes()}
                </Typography>
                <Typography variant="body2">
                  {attendant.endDate.getHours() < 10 ? '0' + attendant.endDate.getHours() : attendant.endDate.getHours()}
                  :{attendant.endDate.getMinutes() < 10 ? '0' + attendant.endDate.getMinutes() : attendant.endDate.getMinutes()}
                </Typography>
              </div>
              <div className="attendantName">
                <Typography variant="h2">{attendant.name} {attendant.surname}</Typography>
              </div>
            </AccordionSummary>
            <div className="captionAccordion">
              <AccordionDetails>
                <Typography variant="body1">
                  {attendant.goal}
                </Typography>
              </AccordionDetails>
            </div>
          </Accordion>
        </div>
  )
}
