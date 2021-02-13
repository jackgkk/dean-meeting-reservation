export { Duty, Dean, Department, currentDate, Meeting, DeanUnregistered, DeanVerifiedReg, InputMeetingType, UnLogedInDean, LogInDean }

class Department {
  constructor (name: string, id: string) {
    this.name = name
    this.id = id

    Object.freeze(this)
  }

  name: string
  id: string
}

class Dean {
  constructor (id: string, name: string, surname: string, email: string, status: string, duties: Array<Duty>) {
    this.id = id
    this.name = name
    this.surname = surname
    this.email = email
    this.duties = duties
    this.status = status

    Object.freeze(this)
  }

  id: string;
  name: string;
  surname: string;
  email: string;
  duties: Array<Duty>
  status: string;
}

class Duty {
  constructor (dayOfWeek: number, begins: string, ends: string) {
    this.dayOfWeek = dayOfWeek
    this.begins = begins
    this.ends = ends

    Object.freeze(this)
  }

  dayOfWeek: number;
  begins: string;
  ends: string;
}

class currentDate {
  constructor () {
    this.date = new Date()

    Object.freeze(this)
  }

  date: Date
}

class Guest {
  id: string
  email: string
  name: string
  surname: string

  constructor (id: string, email: string, name: string, surname: string) {
    this.id = id
    this.name = name
    this.surname = surname
    this.email = email
  }
}

class InputMeetingType {
  id: string
  guest: Guest
  description: string
  date: Date
  duration: number
  deanId: string
  isOnline: Boolean
  accepted: Boolean

  constructor (id: string, guest: Guest, goal: string, beginsAt: Date, duration: number, deanId: string, isOnline: Boolean, accepted: Boolean = false) {
    this.id = id
    this.description = goal
    this.date = beginsAt
    this.duration = duration
    this.deanId = deanId
    this.isOnline = isOnline
    this.accepted = accepted
    this.guest = guest

    Object.freeze(this)
  }
}

class Meeting {
    id: string
    guest: Guest
    goal: string
    beginsAt: Date
    duration: number
    deanId: string
    isOnline: Boolean
    accepted: Boolean
    date: string

    constructor (meeting: InputMeetingType) {
      this.id = meeting.id
      this.goal = meeting.description
      this.beginsAt = new Date(meeting.date)
      this.duration = meeting.duration
      this.deanId = meeting.deanId
      this.isOnline = meeting.isOnline
      this.accepted = meeting.accepted
      this.guest = meeting.guest
      this.date = (this.beginsAt.getDate() < 10 ? '0' + this.beginsAt.getDate().toString() : this.beginsAt.getDate().toString()) + '.' + (this.beginsAt.getMonth() + 1 < 10 ? '0' + (this.beginsAt.getMonth() + 1).toString() : (this.beginsAt.getMonth() + 1).toString()) + '.' + this.beginsAt.getFullYear().toString()
    }
}

class errorStack {
  constructor (email: string, password: string, passwordCheck: string) {
    this.email = email
    this.password = password
    this.passwordCheck = passwordCheck
  }

  email: string
  password: string
  passwordCheck: string
}

class DeanUnregistered {
  constructor (name: string, surname: string, email: string, password: string, passwordCheck: string, department: Department, errorStack: errorStack) {
    this.name = name
    this.surname = surname
    this.email = email
    this.password = password
    this.passwordCheck = passwordCheck
    this.department = department
    this.errorStack = errorStack

    Object.freeze(this)
  }

  department: Department
  name: string;
  surname: string;
  email: string;
  password: string
  passwordCheck: string
  errorStack: errorStack
}

class DeanVerifiedReg {
  constructor (name: string, surname: string, email: string, password: string, department: string) {
    this.name = name
    this.surname = surname
    this.email = email
    this.password = password
    this.department = department

    Object.freeze(this)
  }

  department: string
  name: string;
  surname: string;
  email: string;
  password: string
}

class UnLogedInDean {
  email: string
  password: string
  errorStack: errorStack

  constructor (email: string, password: string, errorStack: errorStack) {
    this.email = email
    this.password = password
    this.errorStack = errorStack
  }
}

class LogInDean {
  email: string
  password: string

  constructor (email: string, password: string) {
    this.email = email
    this.password = password
  }
}
