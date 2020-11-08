export default class Department {
  constructor (name: string, id: string) {
    this.name = name
    this.id = id

    Object.freeze(this)
  }

  name: string
  id: string
}
