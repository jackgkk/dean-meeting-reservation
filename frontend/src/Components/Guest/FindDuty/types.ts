export { Duty, Dean, Department }

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
