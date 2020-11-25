import * as React from 'react'
import { CurrentDay } from './data'
import './index.scss'
import Attendant from './AttendantList/Attendant'
import AttendantList from './AttendantList'

const weekday = new Array(7)
weekday[0] = 'Sunday'
weekday[1] = 'Monday'
weekday[2] = 'Tuesday'
weekday[3] = 'Wednesday'
weekday[4] = 'Thursday'
weekday[5] = 'Friday'
weekday[6] = 'Saturday'
const today = new Date()
console.log(today)
const getPrettyDate = (date: Date) => {
  return (date.getDate().toString() + '.' + (date.getMonth() + 1).toString() + '.' + date.getFullYear().toString())
}

export default function Calendar () {
  const [currentDate, setCurrentDate] = React.useState(today)
  const [day, setDay] = React.useState({ day: weekday[currentDate.getDay()], date: getPrettyDate(currentDate) })

  const yesterdayUpdateHandler = () => {
    today.setDate(today.getDate() - 1)
    setCurrentDate(today)
    setDay({ day: weekday[currentDate.getDay()], date: getPrettyDate(currentDate) })
  }

  const tommorowUpdateHandler = () => {
    today.setDate(today.getDate() + 1)
    setCurrentDate(today)
    setDay({ day: weekday[currentDate.getDay()], date: getPrettyDate(currentDate) })
  }

  return (
    <div className="calendar">
      <div className="infoBar">
        <button onClick={yesterdayUpdateHandler}>prev. day</button>
        <div className="dateDiv">
          <h2>{day.day}, {day.date}</h2>
        </div>
        <button onClick={tommorowUpdateHandler}>next day</button>
      </div>
      <div className="attendantList">
        <AttendantList date={currentDate}/>
      </div>
    </div>
  )
}
