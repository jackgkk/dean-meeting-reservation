import { Theme } from '@material-ui/core'

function Style (theme: Theme) {
  return {
    dean: { backgroundColor: '#fff' },
    listOfDeans: {
      width: '100%',
      padding: 0
    },
    duty: { paddingLeft: theme.spacing(6), backgroundColor: '#fff' }
  }
}

export default Style
