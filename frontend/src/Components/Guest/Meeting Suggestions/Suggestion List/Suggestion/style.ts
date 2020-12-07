import { Theme } from '@material-ui/core'

function useStyles (theme: Theme) {
  return {
    suggestionAccordion: {
      background: '#EFEFEF',
      borderRadius: '5px',
      boxShadow: 'none'
    },
    accordionHiddenContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row'
    }
  }
}

export { useStyles }
