import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({

    btn: {
        color: 'inherit',
        '&:focus': {
            backgroundColor: 'rgba(0, 255, 255, 0.534)',
        },

    },

}));

const SignedOutLinks = (props) => {

    const classes = useStyles();

    return (
        <Toolbar style={{ padding: '0' }}>
            <Button className={classes.btn} component={Link} to="/signup">Sign Up</Button>
            <Button className={classes.btn} component={Link} to="/signin">Login</Button>
        </Toolbar>
    )
}

export default SignedOutLinks;


