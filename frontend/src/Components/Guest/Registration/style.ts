import { createStyles, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  mainContentContainer: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpContainer: {
    width: '54rem',
    minHeight: '30rem',
    overflow: 'hidden',
    background: '#FFFFFF',
    boxShadow: '0px 15px 64px rgba(0, 0, 0, 0.26)',
    padding: '2.5rem 5rem',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    '& div': {
      '& form': {
        margin: '2rem 0'
      }
    }
  },
  inputContainer: {
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    margin: '1rem 0px'
  },
  inputForm: {
    width: '32rem',
    height: '2.75rem',
    background: '#F7F7F7',
    border: '1px solid #E2E2E2',
    boxSizing: 'border-box',
    borderRadius: '5px',
    fontSize: '17px',
    paddingLeft: '1rem',
    '&:focus': {
      outline: 'none',
      background: '#fafafa'

    },
    '&:before, &.MuiInput-underline:hover:not(.Mui-disabled):before, &:after': {
      border: 'none'
    },
    '& div:focus': {
      background: 'transparent'
    },
    '&#error': {
      border: '1px solid #E5231B'
    }
  },
  errorTemp: {
    width: '32rem',
    height: '2.75rem',
    background: '#F7F7F7',
    border: '1px solid #E5231B',
    boxSizing: 'border-box',
    borderRadius: '5px',
    fontSize: '17px',
    paddingLeft: '1rem',
    '&:before, &.MuiInput-underline:hover:not(.Mui-disabled):before, &:after': {
      border: 'none'
    },
    '& div:focus': {
      background: 'transparent'
    }
  },
  label: {
    maxWidth: '7.8rem',
    alignSelf: 'center',
    '&#password': {
      alignSelf: 'baseline',
      marginTop: '10px'
    }
  },
  button: {
    border: '1px solid #E5231B',
    boxSizing: 'border-box',
    borderRadius: '5px',
    width: '10rem',
    height: '3rem',
    float: 'right',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    marginTop: '1rem',
    boxShadow: 'none',
    '&:hover': {
      background: '#E5231B',
      color: 'white'
    },
    '&#alreadyHave': {
      margin: '0',
      background: '#E5231B',
      color: 'white',
      width: '17rem',
      height: '3.7rem',
      float: 'left'

    }
  },
  SignUp: {
    float: 'right',
    color: 'white'
  },
  header: {
    overflow: 'auto',
    width: '100%',
    zIndex: 1,
    minHeight: '2rem'
  },
  circle: {
    position: 'absolute',
    borderRadius: '50%',
    width: '15rem',
    height: '15rem',
    background: '#E5231B',
    top: '-8rem',
    right: '-2rem',
    zIndex: 0

  },
  buttonsDiv: {
  },
  '@media (max-width: 992px)': {
    inputContainer: {
      padding: 0,
      display: 'block',
      margin: '1rem 0px'
    },
    label: {
      alignSelf: 'baseline',
      maxWidth: '100%'
    },
    inputForm: {
      marginTop: '0.3rem',
      width: '100%'
    },
    signUpContainer: {
      width: '40rem'
    },
    buttonsDiv: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '3rem',
      '& #alreadyHave': {
        marginTop: '1rem',
        background: '#E5231B',
        color: 'white',
        height: '3rem'
      }
    }
  },

  '@media (max-width: 768px)': {
    circle: {
      top: '-9rem',
      right: '-4.5rem'
    },
    signUpContainer: {
      height: '100vh',
      padding: '2.5rem 10%',
      '& form': {
        margin: '0'
      },
      overflowY: 'scroll'
    },
    buttonsDiv: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginTop: '0rem',
      alignItems: 'center',
      '& button': {
        width: '100%',
        background: '#E5231B',
        color: 'white'
      },
      '& #alreadyHave': {
        order: '2',
        width: '100%',
        marginTop: '1rem',
        background: 'white',
        color: 'black',
        height: '3rem'
      }
    }
  },
  '@media (min-width: 420px)': {
    circle: {
      right: '-3rem'
    }
  }

})
