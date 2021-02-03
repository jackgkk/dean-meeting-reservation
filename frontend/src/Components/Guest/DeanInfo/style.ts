import { createStyles, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  container: {
    marginTop: '50px',
    width: '37.5rem',
    background: 'white',
    boxShadow: '0px 15px 64px rgba(0, 0, 0, 0.26)',
    borderRadius: '5px',
    display: 'flex',
    padding: '0.6rem 1.1rem',
    boxSizing: 'border-box',
    flexDirection: 'column',
    justifyContent: 'space-around',
    '& div': {
      padding: '0.3rem 0px'
    }
  }
})
