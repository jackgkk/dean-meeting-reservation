export { currentDate, Attendant }

class currentDate {
  constructor () {
    this.date = new Date()

    Object.freeze(this)
  }

  date: Date
}

class AttendatList {
  date: Date
  constructor (date: Date) {
    this.date = date
    Object.freeze(this)
  }
}

class Attendant {
  id: string
  email: string
  name: string
  surname: string
  goal: string
  date: Date
  endDate: Date

  constructor (id: string, name: string, surname: string, email: string, goal: string, date: Date, endDate: Date) {
    this.id = id
    this.name = name
    this.surname = surname
    this.email = email
    this.goal = goal
    this.date = date
    this.endDate = endDate

    Object.freeze(this)
  }
}
