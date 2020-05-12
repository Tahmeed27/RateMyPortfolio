import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import { Toolbar, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { pink,deepOrange} from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

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


const SignedInLinks = (props) =>{

    const classes = useStyles();

    return(
        <Toolbar style={{padding: '0'}}>
            <IconButton className={classes.tab} component={Link} to="/create">
              <AddIcon fontSize="large" />
            </IconButton>
            <Button className={classes.tab} onClick={props.signOut}>Log Out</Button>                     
            <Avatar className={classes.pink}>{props.profile.initials}</Avatar>
        </Toolbar>
    )
}

const mapDispatchToProps =  {
  signOut,

}

export default connect(null, mapDispatchToProps)(SignedInLinks);