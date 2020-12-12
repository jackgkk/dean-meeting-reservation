import { Accordion, AccordionSummary, Typography } from '@material-ui/core'
import * as React from 'react'
import { Meeting as MeetingType } from '../../../types'
import Expanded from './expanded'
import NonExpanded from './nonExpanded'

interface meetingProps {
    meeting: MeetingType
    acceptHandler: (id: string) => void
    cancelHandler: (id: string) => void
  }

export default function MeetingSuggestion ({ meeting, acceptHandler, cancelHandler }: meetingProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const [checked, setChecked] = React.useState(false)

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
    setChecked((prev) => !prev)
  }

  return (
        <div>
          {expanded
            ? <Expanded meeting = {meeting} acceptHandler = {acceptHandler} cancelHandler={cancelHandler} handleChange = {handleChange} expanded={expanded} />
            : <NonExpanded meeting = {meeting} acceptHandler = {acceptHandler} cancelHandler={cancelHandler} handleChange = {handleChange} expanded={expanded} />
            }

        </div>
  )
}
