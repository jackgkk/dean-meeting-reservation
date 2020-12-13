import { createStyles, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  signUpContainer: {
    width: '54rem',
    overflow: 'auto',
    background: '#FFFFFF',
    boxShadow: '0px 15px 64px rgba(0, 0, 0, 0.26)',
    padding: '2.5rem 5rem',
    boxSizing: 'border-box',
    '& form': {
      marginTop: '3rem'
    }
  },
  inputContainer: {
    padding: 0,
    width: '100%',
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
    boxShadow: 'none',
    marginTop: '2rem',
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
    float: 'right'
  },
  header: {
    overflow: 'auto'
  }
})
