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
    description: 'Need to sign some papers',
    date: new Date(2021, 0, 5, 11, 15),
    duration: 15,
    deanId: 'abdf7a9b3830485b0g',
    isOnline: true,
    accepted: false
  },
  {
    id: _id(),
    guest: {
      id: _id(),
      email: 'asd@gmail.com',
      name: 'Mark',
      surname: 'Tompson'
    },
    description: 'Need to sign some papers',
    date: new Date(2021, 0, 5, 15, 15),
    duration: 15,
    deanId: 'abdf7a9b3830485b0g',
    isOnline: true,
    accepted: true
  },
  {
    id: _id(),
    guest: {
      id: _id(),
      email: 'asd@gmail.com',
      name: 'Sam',
      surname: 'Kilton'
    },
    description: 'Need to sign some papers',
    date: new Date(2021, 0, 5, 14, 15),
    duration: 15,
    deanId: 'abdf7a9b3830485b0g',
    isOnline: true,
    accepted: true
  },
  {
    id: _id(),
    guest: {
      id: _id(),
      email: 'asd@gmail.com',
      name: 'Jack',
      surname: 'Daniels'
    },
    description: 'Need to sign some papers',
    date: new Date(2021, 0, 5, 12, 15),
    duration: 30,
    deanId: 'abdf7a9b3830485b0g',
    isOnline: true,
    accepted: false
  },
  {
    id: _id(),
    guest: {
      id: _id(),
      email: 'asd@gmail.com',
      name: 'Sam',
      surname: 'Kilton'
    },
    description: 'Need to sign some papers',
    date: new Date(2021, 0, 9, 14, 15),
    duration: 15,
    deanId: 'abdf7a9b3830485b0g',
    isOnline: true,
    accepted: true
  },
  {
    id: _id(),
    guest: {
      id: _id(),
      email: 'asd@gmail.com',
      name: 'Sam',
      surname: 'Kilton'
    },
    description: 'Need to sign some papers',
    date: new Date(2021, 0, 7, 14, 15),
    duration: 15,
    deanId: 'abdf7a9b3830485b0g',
    isOnline: true,
    accepted: true
  },
  {
    id: _id(),
    guest: {
      id: _id(),
      email: 'asd@gmail.com',
      name: 'Sam',
      surname: 'Kilton'
    },
    description: 'Need to sign some papers',
    date: new Date(2021, 0, 7, 14, 15),
    duration: 15,
    deanId: 'abdf7a9b3830485b0g',
    isOnline: true,
    accepted: true
  },
  {
    id: _id(),
    guest: {
      id: _id(),
      email: 'asd@gmail.com',
      name: 'Sam',
      surname: 'Kilton'
    },
    description: 'Need to sign some papers',
    date: new Date(2021, 0, 17, 14, 15),
    duration: 15,
    deanId: 'abdf7a9b3830485b0g',
    isOnline: true,
    accepted: true
  },
  {
    id: _id(),
    guest: {
      id: _id(),
      email: 'asd@gmail.com',
      name: 'Sam',
      surname: 'Kilton'
    },
    description: 'Need to sign some papers',
    date: new Date(2021, 0, 8, 14, 15),
    duration: 15,
    deanId: 'abdf7a9b3830485b0g',
    isOnline: true,
    accepted: true
  }
]

export { fakeMeetings }
