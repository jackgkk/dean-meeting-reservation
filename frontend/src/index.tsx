import React from 'react'
import ReactDOM from 'react-dom'
import Navigation from './Components/Navigation'
import './index.sass'
import { RecoilRoot } from 'recoil'
import './Components/Guest/Calendar/MeetingList'
import { theme } from './style'
import { ThemeProvider } from '@material-ui/core/styles'

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
