import { atom } from 'recoil'
import Guest from '../../../Guest'
import MeetingProposition from '../../../MeetingProposition'
import Dean from '../../../Dean'
import Duty from '../../../Duty'

export const meetingForm = atom({
  key: 'meetingFormState',
  default: new MeetingProposition(
    new Guest('', '', '', 'Student'),
    '', '', '00:00', 0, false, false
  )
})

export const showMeetingFormState = atom({
  key: 'showMeetingFormState', default: false
})

export const meetingDutyState = atom({
  key: 'meetingDutyState',
  default: new Duty(0, '', '')
})

export const meetingDeanState = atom({
  key: 'meetingDeanState',
  default: new Dean('', '', '', '', '', [new Duty(0, '', '')])
})

export const submittingStatusState = atom<'ready'|'submitting'|'error'|'success'>({
  key: 'submittingStatusState',
  default: 'ready'
})
