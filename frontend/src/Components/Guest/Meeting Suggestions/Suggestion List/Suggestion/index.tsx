import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core'
import * as React from 'react'
import { currentDate as CurrentDateType, Meeting as MeetingType } from '../../../types'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import { useStyles } from './style'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { CancelIcon, ChangeTimeIcon, CheckIcon, MeetingIcon } from './icons'
import teams from './icons/Teams.png'
import { imgProperties } from '@fluentui/react'
import { Dispatch, SetStateAction } from 'react'

interface meetingProps {
    meeting: MeetingType
    acceptHandler: (id: string) => void
    cancelHandler: (id: string) => void
  }

const useStyle = makeStyles({
  suggestionAccordion: {
    background: '#EFEFEF',
    borderRadius: '5px',
    boxShadow: 'none',
    '&$expanded': {
      background: '#E5231B'
    }
  },
  suggestionAccordionExpanded: {
    background: '#E5231B',
    color: 'white'
  },
  accordionSummaryContent: {
    display: 'inline-grid',
    width: '100%',
    alignItems: 'center',
    gridTemplateColumns: '0.8fr 0.3fr 0.8fr 7rem',
    gap: '1rem'
  },
  actionButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& div': {
      display: 'inline-block',
      width: '1.8rem'
    }
  },
  actionButton: {
    maxWidth: '1.8rem'
  },
  attendantName: {
  },
  meetingPeriodDiv: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'left',
    minWidth: '17%'
  },
  isOnlineDiv: {
  },
  meetingGoal: {
  },
  nameAndTimeDiv: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    '& div': {
      margin: '0.2rem 0px'
    }
  }
})

export default function MeetingSuggestion ({ meeting, acceptHandler, cancelHandler }: meetingProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const [checked, setChecked] = React.useState(false)

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
    setChecked((prev) => !prev)
  }

  const styling = useStyle()

  const endTime = new Date() // get current date
  endTime.setHours(meeting.pickedTimeWindow.getHours(), meeting.pickedTimeWindow.getMinutes() + 15, 0, 0)

  return (
        <div>
          {expanded
            ? <div>
                <Accordion className={styling.suggestionAccordionExpanded} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <div className={styling.accordionSummaryContent}>
                      <div className={styling.nameAndTimeDiv}>
                        <div className={styling.meetingPeriodDiv}>
                              <Typography variant="h3">
                                  {meeting.pickedTimeWindow.getHours() < 10 ? '0' + meeting.pickedTimeWindow.getHours() : meeting.pickedTimeWindow.getHours()}
                                  :{meeting.pickedTimeWindow.getMinutes() < 10 ? '0' + meeting.pickedTimeWindow.getMinutes() : meeting.pickedTimeWindow.getMinutes()}
                                  -
                                  {endTime.getHours() < 10 ? '0' + endTime.getHours() : endTime.getHours()}
                                  :{endTime.getMinutes() < 10 ? '0' + endTime.getMinutes() : endTime.getMinutes()}
                                </Typography>
                        </div>
                        <div>
                          <Typography variant="h2">{meeting.name} {meeting.surname}</Typography>
                        </div>
                      </div>
                      <div className={styling.isOnlineDiv}>
                              {meeting.isOnline ? <img src={teams} style={{ margin: '0px auto' }} alt='Microsoft Teams'/> : <Typography variant='body2'>na żywo</Typography>}
                      </div>
                      <div className={styling.meetingGoal}>
                        <Typography variant='body1'>&quot;{meeting.goal}&quot;</Typography>
                      </div>
                      <div className={styling.actionButtonsContainer}>
                      <div onClick={function (event) {
                        acceptHandler(meeting.id)
                        event.stopPropagation()
                      }}
                      onFocus={(event) => event.stopPropagation()}
                      >
                          <CheckIcon className={styling.actionButton} />
                      </div>
                      <div onClick={function (event) {
                        cancelHandler(meeting.id)
                        event.stopPropagation()
                      }}>
                            <CancelIcon className={styling.actionButton}/>
                      </div>
                        <ChangeTimeIcon className={styling.actionButton}/>
                      </div>
                    </div>
                  </AccordionSummary>
                </Accordion>
              </div>
            : <div>
                <Accordion className={styling.suggestionAccordion} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <img src="" alt=""/>
                      <div className={styling.accordionSummaryContent}>
                        <div className={styling.attendantName}>
                          <Typography variant="h2" >{meeting.name} {meeting.surname}</Typography>
                        </div>
                        <div className={styling.isOnlineDiv}>
                            {meeting.isOnline ? <img src={teams} alt='aasd'/> : <Typography variant='body2'>na żywo</Typography>}
                        </div>
                        <div className={styling.meetingPeriodDiv}>
                          <Typography variant="h3">
                                  {meeting.pickedTimeWindow.getHours() < 10 ? '0' + meeting.pickedTimeWindow.getHours() : meeting.pickedTimeWindow.getHours()}
                                  :{meeting.pickedTimeWindow.getMinutes() < 10 ? '0' + meeting.pickedTimeWindow.getMinutes() : meeting.pickedTimeWindow.getMinutes()}
                                  -
                                  {endTime.getHours() < 10 ? '0' + endTime.getHours() : endTime.getHours()}
                                  :{endTime.getMinutes() < 10 ? '0' + endTime.getMinutes() : endTime.getMinutes()}
                                </Typography>
                        </div>
                        <div className={styling.actionButtonsContainer}>
                          <div onClick={function (event) {
                            acceptHandler(meeting.id)
                            event.stopPropagation()
                          }}
                            onFocus={(event) => event.stopPropagation()}
                            >
                            <CheckIcon className={styling.actionButton} />
                          </div>
                          <div onClick={function (event) {
                            cancelHandler(meeting.id)
                            event.stopPropagation()
                          }}>
                            <CancelIcon className={styling.actionButton}/>
                          </div>
                          <ChangeTimeIcon className={styling.actionButton}/>
                        </div>
                      </div>
                    </AccordionSummary>
                  </Accordion>
              </div>
            }

        </div>
  )
}
