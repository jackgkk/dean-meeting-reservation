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
  shadowDiv: {
    visibility: 'hidden'
  },
  contentCont: {
    padding: '20px 0px',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    maxWidth: '1500px'
  },
  textCont: {
    zIndex: 1,
    maxWidth: '650px',
    minWidth: '475px',
    width: '50%',
    '& #heading': {
      fontSize: 'clamp(45px, 4vw, 62px)'
    },
    '& #subheading': {
      fontSize: 'clamp(20px, 2vw, 24px)'
    }
  },
  imgCont: {
    position: 'absolute',
    zIndex: 0,
    width: '50%',
    maxWidth: '850px',
    right: '-2px',
    minWidth: '475px',
    '& img': {
      width: '100%'
    }
  },
  buttonDiv: {
    marginTop: '5rem',
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
  },
  '@media (max-width: 1000px)': {
    body: {
      padding: '0px'
    },
    contentCont: {
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column-reverse',
      width: '100%',
      height: '100%',
      position: 'relative'
    },
    imgCont: {
      position: 'relative',
      width: '100%',
      '& img': {
        zIndex: 0
      }
    },
    textCont: {
      padding: '0px 20px',
      zIndex: 2,
      marginTop: '-30%',
      minWidth: '0px',
      width: '100%',
      '& .MuiTypography-root': {
        color: 'white'
      },
      '& #heading': {
        fontSize: 'clamp(32px, 5vw, 45px)'
      },
      '& #subheading': {
        fontSize: 'clamp(18px, 5vw, 20px)'
      }
    },
    shadowDiv: {
      visibility: 'visible',
      zIndex: 1,
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.13) 0%, rgba(0, 0, 0, 0.72) 89.79%)',
      position: 'absolute',
      width: '100%',
      height: '100%'
    }
  },
  '@media (max-width: 600px)': {
    buttonDiv: {
      flexDirection: 'column',
      width: '100%',
      '& Button': {
        width: '100%',
        '&#alreadyHave': {
          marginTop: '1rem'
        }
      }
    }
  }

})
