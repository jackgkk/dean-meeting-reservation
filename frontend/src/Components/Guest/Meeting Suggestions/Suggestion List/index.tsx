import * as React from 'react'
import { currentDate as CurrentDateType, Meeting as MeetingType } from '../../types'
import { v4 as _id } from 'uuid'
import MeetingSuggestion from './Suggestion'
import { Dispatch, SetStateAction } from 'react'

interface MeetingProps{
  meetings: Array<MeetingType>|undefined
  acceptHandler: (id: string) => void
  cancelHandler: (id: string) => void
  changeHandler: (id: string, beginsAt: Date|undefined, duration: number|undefined) => void
}

export default function SuggestionList ({ meetings, acceptHandler, cancelHandler, changeHandler }: MeetingProps) {
  return (
        <div className="SuggestionListDiv" >
            {meetings?.filter(person => person.accepted === false)
              .map(filteredPerson => (
                <div key={filteredPerson.id} style={{ margin: '1.5rem 0rem' }}>
                    <MeetingSuggestion
                      meeting={filteredPerson}
                      acceptHandler={acceptHandler}
                      cancelHandler={cancelHandler}
                      changeHandler={changeHandler}
                    />
                </div>
              ))}
        </div>
  )
}
