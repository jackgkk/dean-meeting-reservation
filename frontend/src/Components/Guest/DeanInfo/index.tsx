import * as React from 'react'
import { useStyles } from './style'
import Dean from '../../../Dean'
import { Typography } from '@material-ui/core'

interface DeanInfoProps {
  dean: Dean
}

const weekday = new Array(7)
weekday[0] = 'Sunday'
weekday[1] = 'Monday'
weekday[2] = 'Tuesday'
weekday[3] = 'Wednesday'
weekday[4] = 'Thursday'
weekday[5] = 'Friday'
weekday[6] = 'Saturday'

export default function DeanInfo ({ dean }: DeanInfoProps) {
  const styles = useStyles()
  return (
    <div className={styles.container}>
      <div>
        <Typography variant="h1">
          {dean.name} {dean.surname}
        </Typography>
        <IconButton></IconButton>
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
    </div>
  )
}
