import React from 'react'
import ReactDOM from 'react-dom'
import Navigation from './Components/Navigation'
import './index.sass'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from '@material-ui/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#e5231b', light: '#ff6146', dark: '#aa0000' },
    secondary: { main: '#fff', light: '#fff', dark: '#fff' },
    error: { main: '#ff0000' }
  },
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
    },
    subtitle1: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '12px',
      lineHeight: '15px'
    },
    h3: {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '19px',
      lineHeight: '23px'
    }
  },
  overrides: {
    MuiAccordionSummary: {
      root: {
        '&$expanded': {
          // marginTop: '-1rem',
          transition: '0.3s',
          transitionTimingFunction: 'ease'
        }
      }
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
