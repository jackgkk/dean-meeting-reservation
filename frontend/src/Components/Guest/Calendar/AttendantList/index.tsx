import * as React from 'react'
import { currentDate as CurrentDateType, Attendant as AttendantType } from '../types'

import { v4 as _id } from 'uuid'
import Attendant from './Attendant'

interface CurrentDateProps {
    date: Date
  }

export default function AttendantList ({ date }: CurrentDateProps) {
  const [attendant, setAttendant] = React.useState<Array<AttendantType>|undefined>([
    {
      id: _id(),
      email: 'asd@gmail.com',
      name: 'Andrew',
      surname: 'Simpson',
      goal: 'Need to sign some papers',
      date: new Date(2020, 10, 24, 12, 24),
      endDate: new Date(2020, 10, 25, 12, 34)
    },
    {
      id: _id(),
      email: 'asdf@gmail.com',
      name: 'Maks',
      surname: 'Filow',
      goal: 'Need to sign some papers',
      date: new Date(2020, 10, 24, 12, 25),
      endDate: new Date(2020, 10, 25, 12, 45)
    },
    {
      id: _id(),
      email: 'asdef@gmail.com',
      name: 'Kim',
      surname: 'Gk',
      goal: 'Need to sign some papers',
      date: new Date(2020, 10, 24, 13),
      endDate: new Date(2020, 10, 25, 13, 15)
    },
    {
      id: _id(),
      email: 'asasfgad@gmail.com',
      name: 'Ritha',
      surname: 'Methew',
      goal: 'I want to talk about my scholarship',
      date: new Date(2020, 10, 25, 9, 52),
      endDate: new Date(2020, 10, 25, 15, 10)
    },
    {
      id: _id(),
      email: 'asd@gmail.com',
      name: 'Derek',
      surname: 'Kimrad',
      goal: 'Need to sign some papers',
      date: new Date(2020, 10, 24, 11, 12),
      endDate: new Date(2020, 10, 25, 11, 24)
    }
  ])

  return (
        <div className="attendantListDiv">
            {attendant?.filter(person => person.date.getDate() === date.getDate() &&
                                      person.date.getMonth() === date.getMonth() &&
                                      person.date.getFullYear() === date.getFullYear())
              .sort((a, b) => a.date > b.date ? 1 : -1)
              .map(filteredPerson => (
                <div key={filteredPerson.id}>
                    <Attendant attendant={filteredPerson}/>
                </div>
              ))}
        </div>
  )
}
