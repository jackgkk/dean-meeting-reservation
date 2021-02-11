import { Theme } from '@material-ui/core'

export default function (theme: Theme) {
  return {
    meetingSugDiv: {
      width: '43rem',
      minHeight: '25rem',
      maxHeight: '30rem',
      background: '#ffffff',
      boxShadow: '0px 15px 64px rgba(0, 0, 0, 0.26)',
      borderRadius: '5px',
      padding: '13px 20px',
      overflowY: 'scroll',
      boxSizing: 'border-box'
    },
    oppositeContent: {
      flex: 0,
      padding: '0px'
    },
    timelineContainer: {
      padding: '0px'
    },
    timeline: {
      display: 'inline-grid',
      gridTemplateColumns: '9% 4% 87%'
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
      background: theme.palette.primary.main,
      marginTop: '2rem'
    },
    timelineConnector: {
      marginLeft: '2px',
      background: 'rgba(0,0,0,0.05)',
      marginTop: '-1.2rem',
      width: '1px '
    },
    timelineSeparator: {
      margin: '0px auto'
    },
    '@media (max-width: 1400px)': {
      meetingSugDiv: {
        width: '38rem',
        padding: '13px 20px'
      }
    },
    '@media (max-width: 1118px)': {
      meetingSugDiv: {
        width: '100%',
        padding: '13px 20px'
      }
    },
    '@media (max-width: 600px)': {
      meetingSugDiv: {
        padding: '13px 10px'
      },
      timelineDot: {
        // marginLeft: '2px',
        margin: '0rem 0.3rem'
      },
      oppositeContent: {
        display: 'flex',
        alignItems: 'baseline',
        marginBottom: '-0.7rem',
        marginTop: '1rem'
      }

    },
    noSuggestionsInfo: {
      display: 'flex',
      justifyContent: 'center',
      fontSize: '1.5rem',
      color: '#7b7b7b',
      margin: theme.spacing(5, 0)
    }
  }
}
