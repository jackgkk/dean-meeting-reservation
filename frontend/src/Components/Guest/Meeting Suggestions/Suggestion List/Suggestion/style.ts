import { Theme } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
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
export { useStyles }
