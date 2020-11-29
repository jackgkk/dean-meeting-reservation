export default class Duty {
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
