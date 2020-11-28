import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat',
    h2: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '20px',
      lineHeight: '24px'
    },
    body2: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '12px',
      lineHeight: '15px'
    },
    body1: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '15px'
    }
  },
  overrides: {
    MuiAccordionSummary: {
      root: {
        '&$expanded': {
          marginTop: '-1rem',
          transition: '0.2s',
          transitionTimingFunction: 'ease'
        },
        transition: '0.3s',
        transitionTimingFunction: 'ease'
      }
    }
  }
})

export { theme }
