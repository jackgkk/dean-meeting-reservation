export { CurrentDay }

class CurrentDay {
  constructor () {
    this.date = new Date()

    Object.freeze(this)
  }

  changeDay (incrementor: number) {
    this.date.setDate(this.date.getDate() + incrementor)
  }

  getPrettyDate () {
    return (this.date.getDate().toString() + '.' + this.date.getMonth().toString() + '.' + this.date.getFullYear().toString())
  }

  getDayOfWeek () {
    const num = this.date.getDay()
    return (num)
  }

  date: Date
}
