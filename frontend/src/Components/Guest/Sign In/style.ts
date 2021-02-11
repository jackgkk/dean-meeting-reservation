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
    width: '46rem',
    minHeight: '30rem',
    background: '#FFFFFF',
    boxShadow: '0px 15px 64px rgba(0, 0, 0, 0.26)',
    padding: '2.5rem 5rem',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    justifyContent: 'space-between',
    overflow: 'hidden',
    '& form': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    }
  },
  inputContainer: {
    // padding: 0,
    // width: '100%',
    // display: 'flex',
    // flexDirection: 'column',
    // alignContent: 'center',
    margin: '0.5rem 0px',
    '& #forgotPass': {
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
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
    margin: '0.3rem 0',
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
    alignSelf: 'baseline'
  },
  button: {
    border: '1px solid #E5231B',
    boxSizing: 'border-box',
    borderRadius: '5px',
    width: '10rem',
    height: '3rem',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    margin: '0 2rem',
    boxShadow: 'none',
    '&:hover': {
      background: '#E5231B',
      color: 'white',
      boxShadow: 'none'
    },
    '&#alreadyHave': {
      background: '#E5231B',
      color: 'white'
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
    minHeight: '3rem'
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
    display: 'flex',
    justifyContent: 'center',
    marginTop: '3rem'
  },
  responseErrorDiv: {
    marginTop: '1rem',
    background: '#E5231B',
    color: 'white',
    padding: '0.3rem 0.5rem',
    display: 'inline-block'
  },
  '@media (max-height: 30rem)': {
    mainContentContainer: {
      height: 'auto'
    }
  },
  '@media (max-width: 992px)': {
    inputContainer: {
      width: '100%',
      padding: 0,
      display: 'block',
      margin: '1rem 0px'
    },
    inputForm: {
      marginTop: '0.3rem',
      width: '100%'
    },
    signUpContainer: {
      width: '40rem'
    }
  },
  '@media (max-width: 637px)': {
    circle: {
      top: '-9rem',
      right: '-4.5rem'
    },
    header: {
      minHeight: '4rem'
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
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginTop: '2rem',
      alignItems: 'center',
      '& button': {
        width: '100%'
      },
      '& #alreadyHave': {
        order: '2',
        width: '100%',
        marginTop: '1rem',
        background: '#E5231B',
        color: 'white',
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
