import { makeStyles } from '@material-ui/core/styles'

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

export { useStyles }
