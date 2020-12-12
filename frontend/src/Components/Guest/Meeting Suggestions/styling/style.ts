import { makeStyles } from '@material-ui/core/styles'

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

export { useStyle }
