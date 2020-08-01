import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles(theme => ({
  globalLoading: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: '#cecccc7d',

  },
  wrapperIcon: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    top: '30%',
  },
}));