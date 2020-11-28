import * as React from 'react'
import { currentDate as CurrentDateType, Meeting as MeetingType } from '../types'

import { v4 as _id } from 'uuid'
import Meeting from './Meeting'

interface CurrentDateProps {
    date: Date
  }

export default function MeetingList ({ date }: CurrentDateProps) {
  const [meeting, setMeeting] = React.useState<Array<MeetingType>|undefined>([
    {
      id: _id(),
      email: 'asd@gmail.com',
      name: 'Andrew',
      surname: 'Simpson',
      goal: 'Need to sign some papers',
      date: new Date(2020, 10, 24, 12, 24),
      endDate: new Date(2020, 10, 25, 12, 34),
      deanId: 'abdf7a9b3830485b0g'
    },
    {
      id: _id(),
      email: 'asdf@gmail.com',
      name: 'Maks',
      surname: 'Filow',
      goal: 'Need to sign some papers',
      date: new Date(2020, 10, 24, 12, 25),
      endDate: new Date(2020, 10, 25, 12, 45),
      deanId: 'abdf7a9b3830485b0g'
    },
    {
      id: _id(),
      email: 'asdef@gmail.com',
      name: 'Kim',
      surname: 'Gk',
      goal: 'Need to sign some papers',
      date: new Date(2020, 10, 28, 13),
      endDate: new Date(2020, 10, 25, 13, 15),
      deanId: 'abdf7a9b3830485b0g'
    },
    {
      id: _id(),
      email: 'asasfgad@gmail.com',
      name: 'Ritha',
      surname: 'Methew',
      goal: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fringilla eros nunc, sed tincidunt nunc eleifend vel. Sed iaculis, ante non porta pulvinar, arcu nisi maximus eros, egestas luctus est augue et urna',
      date: new Date(2020, 10, 28, 9, 52),
      endDate: new Date(2020, 10, 25, 15, 10),
      deanId: 'abdf7a9b3830485b0g'
    },
    {
      id: _id(),
      email: 'asd@gmail.com',
      name: 'Derek',
      surname: 'Kimrad',
      goal: 'Need to sign some papers',
      date: new Date(2020, 10, 28, 11, 12),
      endDate: new Date(2020, 10, 25, 11, 24),
      deanId: 'abdf7a9b3830485b0g'
    }
  ])

  return (
        <div className="MeetingListDiv">
            {meeting?.filter(person => person.date.getDate() === date.getDate() &&
                                      person.date.getMonth() === date.getMonth() &&
                                      person.date.getFullYear() === date.getFullYear())
              .sort((a, b) => a.date > b.date ? 1 : -1)
              .map(filteredPerson => (
                <div key={filteredPerson.id}>
                    <Meeting meeting={filteredPerson}/>
                </div>
              ))}
        </div>
  )
}
