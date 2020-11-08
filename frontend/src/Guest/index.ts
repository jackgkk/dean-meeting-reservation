interface GuestInterface {
  isEmailAtUniDomain(): boolean
}

export default class Guest implements GuestInterface {
  constructor (name: string, surname: string, email: string, status: string) {
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
  status: string;
}
