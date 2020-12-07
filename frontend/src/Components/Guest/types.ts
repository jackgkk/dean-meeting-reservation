import { format } from 'path'

export { currentDate, Meeting }

class currentDate {
  constructor () {
    this.date = new Date()

    Object.freeze(this)
  }

  date: Date
}

class Meeting {
  id: string
  email: string
  name: string
  surname: string
  goal: string
  date: string
  pickedTimeWindow: Date
  deanId: string
  isOnline: Boolean
  isAccepted: Boolean

  constructor (id: string, name: string, surname: string, email: string, goal: string, pickedTimeWindow: Date, deanId: string, isOnline: Boolean, isAccepted: Boolean = false) {
    this.id = id
    this.name = name
    this.surname = surname
    this.email = email
    this.goal = goal
    this.pickedTimeWindow = pickedTimeWindow
    this.date = this.pickedTimeWindow.getDay().toString() + '.' + this.pickedTimeWindow.getMonth().toString() + '.' + this.pickedTimeWindow.getFullYear().toString()
    this.deanId = deanId
    this.isOnline = isOnline
    this.isAccepted = isAccepted

    Object.freeze(this)
  }
}
