import * as React from 'react'
import { currentDate as CurrentDateType, Meeting as MeetingType } from '../types'
import { v4 as _id } from 'uuid'

const fakeMeetings = [
  {
    id: '7851cb17-f0e7-49c0-abeb-82869231444e',
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
    id: 'a7c8c269-8aa5-4e46-a5eb-99bf7fa625da',
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
    accepted: false
  },
  {
    id: 'd4209629-ae6c-40cc-b5ae-0c952e8476d6',
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
    accepted: false
  },
  {
    id: 'e98c409e-0eb6-427c-969d-2c3faf1a60ff',
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
  }
]

export { fakeMeetings }
