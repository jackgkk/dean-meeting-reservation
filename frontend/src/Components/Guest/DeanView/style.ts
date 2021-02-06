import { createStyles, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  mainContainer: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'scroll'
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    width: '1220px',
    padding: '0 6.6rem'
  },
  meetingsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '6rem',
    justifyContent: 'space-between',
    height: '30rem'
  },
  info: {
    marginTop: '0rem'
  }
  // '@media (max-width: 1360px)': {
  //   meetingsContainer: {
  //     flexDirection: 'column'
  //   }
  // }
})
