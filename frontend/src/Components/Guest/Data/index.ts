import * as React from 'react'
import { currentDate as CurrentDateType, Meeting as MeetingType } from '../types'
import { v4 as _id } from 'uuid'

const fakeMeetings = [
  {
    id: _id(),
    email: 'asd@gmail.com',
    name: 'Andrew',
    surname: 'Simpson',
    goal: 'Need to sign some papers',
    date: '02.02.2020',
    pickedTimeWindow: new Date(2020, 11, 2, 14, 15),
    deanId: 'abdf7a9b3830485b0g',
    isOnline: true,
    isAccepted: false
  },
  {
    id: _id(),
    email: 'asdf@gmail.com',
    name: 'Arnold ',
    surname: 'Dunkin',
    goal: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '02.02.2020',
    pickedTimeWindow: new Date(2020, 11, 2, 14, 30),
    deanId: 'abdf7a9b3830485b0g',
    isOnline: false,
    isAccepted: false
  },
  {
    id: _id(),
    email: 'asdef@gmail.com',
    name: 'Kim',
    surname: 'Gk',
    goal: 'Need to sign some papers',
    date: '02.02.2020',
    pickedTimeWindow: new Date(2020, 11, 2, 14, 45),
    deanId: 'abdf7a9b3830485b0g',
    isOnline: false,
    isAccepted: false
  },
  {
    id: _id(),
    email: 'asasfgad@gmail.com',
    name: 'Ritha',
    surname: 'Methew',
    goal: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fringilla eros nunc, sed tincidunt nunc eleifend vel. Sed iaculis, ante non porta pulvinar, arcu nisi maximus eros, egestas luctus est augue et urna',
    date: '03.02.2020',
    pickedTimeWindow: new Date(2020, 11, 2, 15),
    deanId: 'abdf7a9b3830485b0g',
    isOnline: false,
    isAccepted: true
  },
  {
    id: _id(),
    email: 'asd@gmail.com',
    name: 'Derek',
    surname: 'Kimrad',
    goal: 'Need to sign some papers',
    date: '04.02.2020',
    pickedTimeWindow: new Date(2020, 11, 4, 14),
    deanId: 'abdf7a9b3830485b0g',
    isOnline: false,
    isAccepted: false
  }
]

export { fakeMeetings }
