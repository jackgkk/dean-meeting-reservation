import { createStyles, makeStyles } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles/createMuiTheme'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: 'space-between',
      paddingRight: '3rem',
      paddingLeft: '3rem'
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    '@media (max-width: 992px)': {
      root: {
        display: 'none'
      }
    }
  })
)
