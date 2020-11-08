import React from 'react'
import {atom, selector, useRecoilState} from 'recoil'
import Guest from '../../../Guest'
import MeetingProposition from '../../../MeetingProposition'

const meetingForm = atom({
  key: 'meetingFormState',
  default: new MeetingProposition(
    new Guest('', '', '', ''), '', '', '00:00', 0, false
  )
})

const showMeetingFormState = atom({
  key: 'showMeetingFormState', default: false
})

const showMeetingForm = selector({
  key: 'showMeetingForm',
  get: ({get}) => get(showMeetingForm)
  set:
})

const closeMeetingForm = useRecoilState(showMeetingForm)[1]

export { meetingForm, showMeetingForm }
