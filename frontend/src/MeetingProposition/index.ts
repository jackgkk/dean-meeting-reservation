import Guest from '../Guest'

export default class MeetingProposition {
  constructor (guest: Guest, deanId: string, description: string, beginsAt: string, duration: number, isOnline: boolean, isNotRobot: boolean) {
    this.guest = guest
    this.deanId = deanId
    this.description = description
    this.beginsAt = beginsAt
    this.duration = duration
    this.isOnline = isOnline
    this.isNotRobot = isNotRobot
  }

  guest: Guest;
  deanId: string;
  description: string;
  beginsAt: string;
  duration: number;
  isOnline: boolean;
  isNotRobot: boolean;
}
