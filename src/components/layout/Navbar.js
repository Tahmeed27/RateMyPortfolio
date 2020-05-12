import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    
  },
  title: {
    display: 'block',
    textDecoration: 'none',
    '&:focus': {
      outline: 'none',
  },
    marginLeft:'1rem'
   
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
  
}));

const Navbar = (props) => {
  const classes = useStyles();
  const {auth, profile} = props;
  const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks />;
  

  return (
    <div className={classes.root}>
      <AppBar style={{backgroundColor: '#1D3557'}} position="static">
        <Toolbar className={classes.toolbar}> 
            <Typography component={Link} to={'/'} variant="h5" color="inherit" className={classes.title}>
              RateMyPortfolio
            </Typography>

          { links }
                    
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }

}

export default connect(mapStateToProps)(Navbar)

