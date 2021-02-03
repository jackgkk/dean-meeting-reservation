import { Theme } from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  suggestionAccordion: {
    background: '#EFEFEF',
    borderRadius: '5px',
    boxShadow: 'none',
    '&$expanded': {
      background: '#E5231B'
    },
    transition: 'height 0.1s'
  },
  suggestionAccordionExpanded: {
    background: '#E5231B',
    color: 'white',
    transition: 'height 0.1s',
    '& .MuiIconButton-root': {
      color: 'inherit'
    }
  },
  accordionSummaryContent: {
    display: 'inline-grid',
    width: '100%',
    alignItems: 'center',
    gridTemplateColumns: '0.8fr 0.3fr 0.8fr 8rem',
    gap: '1rem'
  },
  actionButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .MuiIconButton-root': {
      display: 'inline-block',
      width: '1.8rem',
      height: '1.8rem',
      padding: '0',
      color: 'inherit'
    }
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center'
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
    display: 'flex',
    alignItems: 'center'
  },
  meetingGoal: {
    padding: '0'
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
