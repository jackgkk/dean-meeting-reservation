import { createStyles, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  mainContainer: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'scroll',
    paddingTop: '2rem',
    paddingBottom: '5rem'
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
  },
  '@media (max-width: 1px)': {

  },
  '@media (max-width: 1300px)': {

    contentContainer: {
      padding: '0 5%'
    }
  },
  '@media (max-width: 1180px)': {
    info: {
      width: '100%'
    },
    meetingsContainer: {
      width: '100%'
    },
    contentContainer: {
      padding: '0 3%'
    }
  },
  '@media (max-width: 1118px)': {
    meetingsContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      height: '60rem'
    },
    contentContainer: {
      width: '100%',
      alignItems: 'center',
      padding: '0 20px'
    }
  },
  '@media (max-width: 600px)': {
    mainContainer: {
      padding: '0 20px',
      paddingTop: '2rem',
      paddingBottom: '5rem'
    },
    contentContainer: {
      padding: '0'
    },
    meetingsContainer: {
      marginTop: '2rem',
      justifyContent: 'space-around'
    }
  }

})
