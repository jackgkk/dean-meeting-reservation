import * as React from 'react'
import { useStyles } from './style'
import Dean from '../../../Dean'
import { IconButton, Typography } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import { useState } from 'react'
import ModifyDuties from './ModifyDuties'
import { Duty } from '../types'

interface DeanInfoProps {
  dean: Dean
  updateOfficeHours: (officeHours: Array<Duty>) => void
}

const weekday = new Array(7)
weekday[0] = 'Sunday'
weekday[1] = 'Monday'
weekday[2] = 'Tuesday'
weekday[3] = 'Wednesday'
weekday[4] = 'Thursday'
weekday[5] = 'Friday'
weekday[6] = 'Saturday'

export { weekday }

export default function DeanInfo ({ dean, updateOfficeHours }: DeanInfoProps) {
  const styles = useStyles()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.circle}/>
      <div className={styles.nameAndEdit}>
        <Typography variant="h1">
          {dean.name} {dean.surname}
        </Typography>
        <IconButton
          aria-label="accept"
          style={{ height: '25px', color: 'white' }}
          onClick={() => setIsDialogOpen(true)}
        >
          <CreateIcon style={{ height: '16px' }} />
          <Typography variant="body1">edit</Typography>
        </IconButton>
      </div>
      <div>
        <Typography variant="h2">{dean.status}</Typography>
      </div>
      <div>
        {dean.duties.map((duty) => (
          <div key={duty.begins}>
            <Typography variant="h2">
              {weekday[duty.dayOfWeek]} {duty.begins} - {duty.ends}
            </Typography>
          </div>
        ))}
      </div>
      {isDialogOpen && <ModifyDuties
          isOpen={isDialogOpen}
          onClose={handleClose}
          currentDuties={dean.duties}
          onChange={handleChange}
      />}
    </div>
  )

  function handleClose () {
    setIsDialogOpen(false)
  }

  function handleChange (officeHours: Array<Duty>) {
    updateOfficeHours(officeHours)
    handleClose()
  }
}
