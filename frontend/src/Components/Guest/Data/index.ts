import * as React from 'react'
import { currentDate as CurrentDateType, Meeting as MeetingType } from '../types'
import { v4 as _id } from 'uuid'

const fakeMeetings = [
  {
    id: _id(),
    guest: {
      id: _id(),
      email: 'asd@gmail.com',
      name: 'Andrew',
      surname: 'Simpson'
    },
    goal: 'Need to sign some papers',
    beginsAt: new Date(2021, 0, 5, 11, 15),
    duration: 15,
    deanId: 'abdf7a9b3830485b0g',
    isOnline: true,
    isAccepted: false
  },
  {
    id: _id(),
    guest: {
      id: _id(),
      email: 'asd@gmail.com',
      name: 'Mark',
      surname: 'Tompson'
    },
    goal: 'Need to sign some papers',
    beginsAt: new Date(2021, 0, 5, 15, 15),
    duration: 15,
    deanId: 'abdf7a9b3830485b0g',
    isOnline: true,
    isAccepted: false
  },
  {
    id: _id(),
    guest: {
      id: _id(),
      email: 'asd@gmail.com',
      name: 'Sam',
      surname: 'Kilton'
    },
    goal: 'Need to sign some papers',
    beginsAt: new Date(2021, 0, 5, 14, 15),
    duration: 15,
    deanId: 'abdf7a9b3830485b0g',
    isOnline: true,
    isAccepted: false
  },
  {
    id: _id(),
    guest: {
      id: _id(),
      email: 'asd@gmail.com',
      name: 'Jack',
      surname: 'Daniels'
    },
    goal: 'Need to sign some papers',
    beginsAt: new Date(2021, 0, 5, 12, 15),
    duration: 30,
    deanId: 'abdf7a9b3830485b0g',
    isOnline: true,
    isAccepted: false
  },
  {
    id: _id(),
    guest: {
      id: _id(),
      email: 'asd@gmail.com',
      name: 'Jack',
      surname: 'Daniels'
    },
    goal: 'Need to sign some papers',
    beginsAt: new Date(2021, 0, 6, 12, 15),
    duration: 30,
    deanId: 'abdf7a9b3830485b0g',
    isOnline: true,
    isAccepted: false
  }
]

export { fakeMeetings }
