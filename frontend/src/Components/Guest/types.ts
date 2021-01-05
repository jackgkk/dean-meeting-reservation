export { Duty, Dean, Department, currentDate, Meeting, DeanUnregistered, DeanVerifiedReg, InputMeetingType }

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
  goal: string
  beginsAt: Date
  duration: number
  deanId: string
  isOnline: Boolean
  isAccepted: Boolean

  constructor (id: string, guest: Guest, goal: string, beginsAt: Date, duration: number, deanId: string, isOnline: Boolean, isAccepted: Boolean = false) {
    this.id = id
    this.goal = goal
    this.beginsAt = beginsAt
    this.duration = duration
    this.deanId = deanId
    this.isOnline = isOnline
    this.isAccepted = isAccepted
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
    isAccepted: Boolean
    date: string

    constructor (meeting: InputMeetingType) {
      this.id = meeting.id
      this.goal = meeting.goal
      this.beginsAt = meeting.beginsAt
      this.duration = meeting.duration
      this.deanId = meeting.deanId
      this.isOnline = meeting.isOnline
      this.isAccepted = meeting.isAccepted
      this.guest = meeting.guest
      this.date = this.beginsAt.getDay().toString() + '.' + this.beginsAt.getMonth().toString() + '.' + this.beginsAt.getFullYear().toString()
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
  constructor (username: string, name: string, surname: string, email: string, password: string, department: Department) {
    this.name = name
    this.surname = surname
    this.email = email
    this.password = password
    this.department = department
    this.username = username

    Object.freeze(this)
  }

  username: string
  department: Department
  name: string;
  surname: string;
  email: string;
  password: string
}
