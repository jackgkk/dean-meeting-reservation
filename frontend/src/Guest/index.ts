interface GuestInterface {
  isEmailAtUniDomain(): boolean
}

type Status = 'Student'|'Faculty employee'|'University employee'|'Other'

export default class Guest implements GuestInterface {
  constructor (name: string, surname: string, email: string, status: Status) {
    this.name = name
    this.surname = surname
    this.email = email
    this.status = status
  }

  isEmailAtUniDomain (): boolean {
    return false
  }

  name: string;
  surname: string;
  email: string;
  status: Status;
}
