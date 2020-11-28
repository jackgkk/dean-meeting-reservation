export { currentDate, Meeting }

class currentDate {
  constructor () {
    this.date = new Date()

    Object.freeze(this)
  }

  date: Date
}

class MeetingList {
  date: Date
  constructor (date: Date) {
    this.date = date
    Object.freeze(this)
  }
}

class Meeting {
  id: string
  email: string
  name: string
  surname: string
  goal: string
  date: Date
  endDate: Date
  deanId: string

  constructor (id: string, name: string, surname: string, email: string, goal: string, date: Date, endDate: Date, deanId: string) {
    this.id = id
    this.name = name
    this.surname = surname
    this.email = email
    this.goal = goal
    this.date = date
    this.endDate = endDate
    this.deanId = deanId

    Object.freeze(this)
  }
}
