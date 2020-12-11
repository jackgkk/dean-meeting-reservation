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
    return await handleResponse(await fetch(`/api/department/${departmentId}`))
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
  const [deans, setDeans] = useState<Array<DeanType>|undefined>([
    new DeanType(
      '82cfb68d-9019-4b2a-af69-22ca93889ccb',
      'Izabella',
      'Nowakowska',
      'izabella.nowakowska@wmii.uni.lodz.pl',
      'professor',
      [
        new DutyType(
          2,
          '12:00',
          '15:00'),
        new DutyType(
          0,
          '09:00',
          '12:00')
      ]
    ),
    new DeanType(
      '5dfg565g',
      'John',
      'Doe',
      'john.doe@uni.org',
      'professor',
      [
        new DutyType(
          5,
          '9:00',
          '11:00')
      ]
    )])

  const classes = makeStyles(function (theme: Theme) {
    return createStyles(Style(theme))
  })()

  const [isExpanded, setIsExpanded] = useState(false)

  async function handleShowDuties () {
    setIsExpanded(isExpanded => !isExpanded)

    if (!isExpanded) return

    try {
      setDeans(await getDeans(department.id))
    } catch ({ message }) {
      console.error(message)
    }
  }

  return (
    <Accordion style={{ backgroundColor: '#f5f5f5' }}>
      <Tooltip title='Show dean&apos;s duties'>
        <AccordionSummary
          style={{ backgroundColor: '#f5f5f5' }}
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
