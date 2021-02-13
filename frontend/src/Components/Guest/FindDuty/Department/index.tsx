import React, { useState } from 'react'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Accordion, Card, createStyles, Theme, Typography } from '@material-ui/core'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import DeanType from '../../../../Dean'
import DepartmentType from '../../../../Department'
import DutyType from '../../../../Duty'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Tooltip from '@material-ui/core/Tooltip'
import Dean from './Dean'
import List from '@material-ui/core/List'
import Style from './style'

interface DepartmentProps {
  department: DepartmentType
}

async function getDeans (departmentId: string): Promise<Array<DeanType>|undefined> {
  try {
    return await handleResponse(await fetch(`/api/departments/${departmentId}`))
  } catch (e) {
    handleError(e)
    throw e
  }

  async function handleResponse (res: Response) {
    if (res.ok) {
      return await res.json() as Promise<Array<DeanType>>
    } else {
      throw new Error(`Error while fetching departments: Request ended with: ${res.status}`)
    }
  }

  function handleError ({ message }: Error) {
    console.error(message)
  }
}

export default function Department ({ department }: DepartmentProps) {
  const { name: departmentName } = department
  const [deans, setDeans] = useState<Array<DeanType>|undefined>([])

  const classes = makeStyles(function (theme: Theme) {
    return createStyles(Style(theme))
  })()

  const [isExpanded, setIsExpanded] = useState(false)

  async function handleShowDuties () {
    if (isExpanded) return

    setIsExpanded(isExpanded => !isExpanded)

    try {
      setDeans(await getDeans(department.id))
    } catch ({ message }) {
      console.error(message)
    }
  }

  return (
    <Accordion style={{
      backgroundColor: 'white'
    }}>
      <Tooltip title='Show dean&apos;s duties'>
        <AccordionSummary
          style={{ backgroundColor: '#eee', border: 'none', boxShadow: 'none' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={handleShowDuties}
        >
          <Typography>{departmentName}</Typography>
        </AccordionSummary>
      </Tooltip>
      <AccordionDetails>
          <List className={classes.listOfDeans}>
            {deans?.map(dean =>
              <div key={dean.id} style={{ marginBottom: '1rem' }}>
                  <Card>
                    <Dean {...dean} />
                  </Card>
              </div>)}
          </List>
      </AccordionDetails>
    </Accordion>
  )
}
