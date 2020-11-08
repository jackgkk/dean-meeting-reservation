import Duty from '../Duty'

export default class Dean {
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
