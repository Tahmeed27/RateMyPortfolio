import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import { Toolbar, Button, IconButton, Popover } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { pink, deepOrange } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import Notifications from '../dashboard/Notifications'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const useStyles = makeStyles(theme => ({

  tab: {
    paddingRight: '1rem',
    textDecoration: 'none',
    color: 'inherit',

  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
}));


const SignedInLinks = (props) => {
  const classes = useStyles();
  const { notifications } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Toolbar style={{ padding: '0' }}>
      <IconButton className={classes.tab} component={Link} to="/create">
        <AddIcon fontSize="large" />
      </IconButton>
      <IconButton className={classes.tab} onClick={handleClick}>
        <NotificationsOutlinedIcon fontSize="large" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <Notifications notifications={notifications} />
      </Popover>
      <Button className={classes.tab} onClick={props.signOut}>Log Out</Button>
      <Avatar className={classes.pink}>{props.profile.initials}</Avatar>
    </Toolbar>
  )
}

const mapStateToProps = (state) => {
  // console.log(state.firestore.ordered);
  return {
    notifications: state.firestore.ordered.notifications
  }
}

const mapDispatchToProps = {
  signOut,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }])
)(SignedInLinks);

