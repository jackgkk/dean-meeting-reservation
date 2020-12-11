import React, { useState } from 'react'
import { Dean as DeanType } from '../../../types'
import ListItem from '@material-ui/core/ListItem'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { createStyles, Theme } from '@material-ui/core'
import Style from '../style'
import Duty from './Duty'
import ListItemText from '@material-ui/core/ListItemText'
import { ExpandLess, ExpandMore } from '@material-ui/icons'

export default function Dean (dean: DeanType) {
  const classes = makeStyles(function (theme: Theme) {
    return createStyles(Style(theme))
  })()

  const [showDuties, setShowDuties] = useState(false)

  function toggleDuties () {
    setShowDuties(show => !show)
  }

  return <>
    <ListItem className={classes.dean} button={true} onClick={toggleDuties}>
      <p>{dean.name} {dean.surname}</p>
      <ListItemText />
      {showDuties ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    { dean.duties.map((duty, key) => <Duty duty={duty} show={showDuties} key={key} />) }
  </>
}
