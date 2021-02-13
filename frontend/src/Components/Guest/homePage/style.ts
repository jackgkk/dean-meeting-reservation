import { createStyles, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  body: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    paddingLeft: '107px',
    background: 'linear-gradient(104.66deg, #8BC6EC 5.31%, #9599E2 95.31%)'
  },
  contentCont: {
    display: 'flex',
    width: '100%',
    alignItems: 'center'
  },
  textCont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '650px',
    height: '500px',
    justifyContent: 'space-between'
  },
  imgCont: {
    maxWidth: '654px',
    maxHeight: '655px'
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '450px'
  },
  button: {
    boxSizing: 'border-box',
    background: '#E5231B',
    color: 'white',
    borderRadius: '5px',
    width: '210px',
    height: '60px',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '18px',
    boxShadow: 'none',
    '&#alreadyHave': {
      background: 'white',
      color: 'black',
      '&:hover': {
        background: '#E5231B',
        color: 'white',
        boxShadow: 'none'
      }
    },
    '&:hover': {
      background: '#E5231B',
      color: 'white',
      boxShadow: '0px 7px 25px rgba(0, 0, 0, 0.3)'
    }
  }
})
